<template>
  <v-card>
    <div class='title-container'>
      <v-card-title>
        Today's Top Growing Communities
      </v-card-title>
    </div>
    <v-list>
      <v-list-item v-for='(community, i) in prefixedCommunities' :key='community.id'>
        <span>{{ i+1 }}</span> {{ community.name }}
      </v-list-item>
    </v-list>
    <v-btn color='blue' width='80%'>
      VIEW ALL
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: [
    'communities'
  ],
  computed: {
    prefixedCommunities () {
      return this.communities.map(e => ({ ...e, name: `r/${e.name}` }))
    }
  }
}
</script>

<style scoped lang='scss'>
  .v-card {
    padding-bottom: 10px;
  }
  .title-container {
    background: linear-gradient(#484848, #252525);
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
  @media screen and (max-width: 1300px) {
    .v-card__title {
      font-size: 16px;
    }
  }
</style>
