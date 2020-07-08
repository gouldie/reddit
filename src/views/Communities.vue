<template>
  <v-container>
    <v-row>
      <v-col v-if='$vuetify.breakpoint.smAndUp' :md='2' :sm='3'>
        <v-card class='categories'>
          <v-card-title class='blue-grey lighten-5'>
            Categories
          </v-card-title>
          <v-divider />
          <v-card-text
            v-for='c in categories'
            :key='c'
            :class='c === category && "blue-grey lighten-5"'
            @click='selectCategory(c)'
          >
            {{ c }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col :md='6' :sm='9'>
        <div>2</div>
      </v-col>
      <v-col v-if='$vuetify.breakpoint.mdAndUp' :md='4'>
        <div>3</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import communities from '@/assets/json/communities.json'

export default {
  data: function () {
    return {
      category: null
    }
  },
  computed: {
    categories () {
      return communities.reduce((accumulator, currentValue) => {
        if (!accumulator.includes(currentValue.category)) accumulator.push(currentValue.category)
        return accumulator
      }, []).sort((a, b) => a < b ? -1 : 1)
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
  .col>div {
    min-height: 100px;
    border: 1px solid black;
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
