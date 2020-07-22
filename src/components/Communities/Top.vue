<template>
  <v-card :class='!alt && "padding-bot"'>
    <div :class='!alt && "black-gradient"'>
      <v-card-subtitle :class='alt && "alt blue-grey lighten-5"'>
        {{ title }}
      </v-card-subtitle>
    </div>
    <v-list>
      <router-link v-for='(community, i) in prefixedCommunities' :key='community.id' :to='community.name'>
        <v-list-item>
          <span>{{ i+1 }}</span> <Icon /> <v-card-text class='community-name'>{{ community.name }}</v-card-text>
        </v-list-item>
      </router-link>
    </v-list>
    <v-btn v-if='!alt' color='blue' min-width='80%' @click='this.onClick'>
      {{ category ? `SEE MORE ${category.toUpperCase()}` : "VIEW ALL" }}
    </v-btn>
  </v-card>
</template>

<script>
import Icon from '@/components/Communities/Icon.vue'

export default {
  components: {
    Icon
  },
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
  .v-card__subtitle {
    // font-size: 18px;
    color: #fff !important;
    padding-top: 50px;
    &.alt {
      padding: 7px 10px;
      color: black !important;
    }
  }
  .v-list {
    padding: 0;
  }
  .v-list-item {
    border-top: 1px solid #d0d0d0;
    cursor: pointer;
    span {
      margin-right: 15px;
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
  .community-name {
    flex: 1;
    padding-left: 0;
  }
</style>
