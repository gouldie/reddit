<template>
  <v-card>
    <div class='black-gradient'>
      <v-card-title>
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
    <v-btn color='blue' width='80%' @click='$router.push("/communities")'>
      VIEW ALL
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: [
    'category',
    'communities'
  ],
  computed: {
    title () {
      return this.category ? `Top ${this.category} Communities` : "Today's Top Growing Communities"
    },
    prefixedCommunities () {
      // TODO: order by top growing
      return this.communities.filter(e => !this.category || (this.category === e.category)).map(e => ({ ...e, name: `r/${e.name}` })).slice(0, 5)
    }
  }
}
</script>

<style scoped lang='scss'>
  .v-card {
    padding-bottom: 10px;
  }
  .v-card__title {
    font-size: 18px;
    color: #fff;
    padding-top: 50px;
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
