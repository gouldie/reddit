<template>
  <v-container>
    <v-row>
      <v-col v-if='$vuetify.breakpoint.smAndUp' :md='2' :sm='3'>
        <v-card class='categories'>
          <v-card-subtitle class='blue-grey lighten-5'>
            Categories
          </v-card-subtitle>
          <v-divider />
          <v-card-text
            :class='!category && "blue-grey lighten-5"'
            @click='selectCategory(null)'
          >
            All Communities
          </v-card-text>
          <v-card-text
            v-for='c in categories.sort((a, b) => a < b ? -1 : 1)'
            :key='c'
            :class='c === category && "blue-grey lighten-5"'
            @click='selectCategory(c)'
          >
            {{ c }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :md='6' :sm='9'>
        <TopCommunities :communities='communities' :alt='true' :category='category' />
      </v-col>
      <v-col v-if='$vuetify.breakpoint.mdAndUp' :md='4'>
        <TopCommunities :communities='communities' :category='randomCategory[0]' @selectCategory='selectCategory' />
        <TopCommunities :communities='communities' :category='randomCategory[1]' @selectCategory='selectCategory' />
        <BrowseAZ />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import communitiesJSON from '@/assets/json/communities.json'
import TopCommunities from '@/components/Communities/Top.vue'
import BrowseAZ from '@/components/Communities/BrowseAZ.vue'

export default {
  components: {
    TopCommunities,
    BrowseAZ
  },
  data: function () {
    return {
      communities: communitiesJSON,
      category: null
    }
  },
  computed: {
    categories () {
      return this.communities.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue.category)) accumulator.push(currentValue.category)
        return accumulator
      }, [])
    },
    // two random categories
    randomCategory (n) {
      const cat = this.categories
      return cat.sort(() => Math.random() - Math.random()).slice(0, 2)
    }
  },
  methods: {
    selectCategory (c) {
      this.category = c
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-card__subtitle {
    padding: 7px 10px;
    color: black !important;
  }
  .v-card {
    margin-bottom: 20px;
  }
  .col>div {
    min-height: 100px;
    border: 1px solid #c5c5c5;
  }
  .categories {
    .v-card__title {
      padding: 5px 8px;
    }
    .v-card__text {
      padding: 8px;
      color: black;
      cursor: pointer;
      &:hover {
        background: #eceff1;
      }
    }
  }
</style>
