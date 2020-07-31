<template>
  <div>
    <div class='az-container'>
      <v-container>
        <v-card-title>Community Directory</v-card-title>
        <div class='letters'>
          <span v-for='letter in letters' :key='letter' @click='setLetter(letter)'>
            {{ letter }}
          </span>
        </div>
      </v-container>
    </div>
    <v-container>
      <v-card>
        <v-card-title>
          Browse Communities starting with {{ letter }}
        </v-card-title>
        <v-divider />
        <div v-if='filteredCommunities.length > 0'>
          <v-card-text v-for='community in filteredCommunities' :key='community.id'>
            <span @click='$router.push(`/r/${community.name}`)'>{{ community.name }}</span>
          </v-card-text>
        </div>
        <div v-else><v-card-text>No communities found</v-card-text></div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import communities from '@/assets/json/communities.json'

export default {
  data: function () {
    return {
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      letter: this.initializeLetter(),
      communities
    }
  },
  methods: {
    setLetter (letter) {
      this.letter = letter
    },
    initializeLetter () {
      if (this.$route.params.letter) {
        if (this.$route.params.letter === 'no') return '#'
        return this.$route.params.letter.toUpperCase()
      }
      return 'A'
    }
  },
  computed: {
    filteredCommunities () {
      return this.communities.filter(c => {
        // return true
        if (this.letter === '#') return !isNaN(parseInt(c.name.charAt(0)))
        return c.name.charAt(0).toUpperCase() === this.letter
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';

  .az-container {
    background: #fff;
    .v-card__title {
      padding: 8px 16px;
      font-size: 20px;
    }
    .container {
      padding-top: 12px;
    }
  }
  .letters {
    padding: 0 16px;
  }
  span {
    cursor: pointer;
    color: #0079d3;
  }
  .v-card {
    padding-bottom: 10px;
  }
  .v-divider {
    margin-bottom: 10px;
  }
  .v-card__text {
    width: 25%;
    display: inline-block;
    padding-top: 0;
    padding-bottom: 0;
    span {
      cursor: pointer;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .az-container {
      .v-card__title {
        font-size: 16px;
      }
      span {
        font-size: 12px;
      }
    }
  }
</style>
