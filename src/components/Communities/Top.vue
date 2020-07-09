<template>
  <v-card :class='!alt && "padding-bot"'>
    <div :class='!alt && "black-gradient"'>
      <v-card-title :class='alt && "alt blue-grey lighten-5"'>
        {{ title }}
      </v-card-title>
    </div>
    <v-list>
      <router-link v-for='(community, i) in prefixedCommunities' :key='community.id' :to='community.name'>
        <v-list-item>
          <span>{{ i+1 }}</span> {{ community.name }}
        </v-list-item>
      </router-link>
    </v-list>
    <v-btn v-if='!alt' color='blue' width='80%' @click='this.onClick'>
      {{ category ? `SEE MORE ${category.toUpperCase()}` : "VIEW ALL" }}
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: [
    'category',
    'communities',
    'alt' // alternative view, i.e. smaller header bar and no 'view all' button
  ],
  computed: {
    title () {
      if (this.alt) {
        return this.category ? `Today's Top Growing in ${this.category}` : "Today's Top Growing Communities"
      } else {
        return this.category ? `Top ${this.category} Communities` : "Today's Top Growing Communities"
      }
    },
    prefixedCommunities () {
      // TODO: order by top growing
      return this.communities.filter(e => !this.category || (this.category === e.category)).map(e => ({ ...e, name: `r/${e.name}` })).slice(0, 5)
    }
  },
  methods: {
    onClick () {
      if (!this.category) {
        this.$router.push('/communities')
      } else {
        this.$emit('selectCategory', this.category)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  .padding-bot {
    padding-bottom: 10px;
  }
  .v-card__title {
    font-size: 18px;
    color: #fff;
    padding-top: 50px;
    &.alt {
      padding: 5px 8px;
      color: inherit;
    }
  }
  .v-list {
    padding: 0;
  }
  .v-list-item {
    border-top: 1px solid #d0d0d0;
    cursor: pointer;
    span {
      margin-right: 10px;
    }
  }
  .v-btn {
    color: #fff;
    display: flex;
    margin: 10px auto;
  }
  a {
    text-decoration: none;
  }
  @media screen and (max-width: 1300px) {
    .v-card__title {
      font-size: 16px;
    }
  }
</style>
