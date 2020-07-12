<template>
  <div>
    <CommunitiesHeader>
      <div>
      <h2>Community Directory</h2>
      <span v-for='letter in letters' :key='letter' @click='setLetter(letter)'>
        {{ letter }}
      </span>
      </div>
    </CommunitiesHeader>
    <v-container>
      <v-card>
        <v-card-title>
          Browse Communities starting with {{ letter }}
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import communities from '@/assets/json/communities.json'
import CommunitiesHeader from '@/components/Communities/Header.vue'

export default {
  components: {
    CommunitiesHeader
  },
  data: function () {
    return {
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
      letter: (this.$route.params.letter && this.$route.params.letter.toUpperCase()) || 'A',
      communities
    }
  },
  methods: {
    setLetter (letter) {
      this.letter = letter
    }
  }
}
</script>
