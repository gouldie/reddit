<template>
  <v-app light color='blue'>
    <Header />
    <v-content color='blue'>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/Layout/Header'

export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
    //
  })
}
</script>

<style lang='scss'>
  html {
    overflow-y: auto !important;
  }
  .container {
    padding-top: 30px;
  }
  .v-content {
    background-color: #dae0e7;
  }
</style>
