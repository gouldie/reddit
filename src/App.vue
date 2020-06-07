<template>
  <v-app id="inspire">
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  data: () => ({
    //
  })
}
</script>

<style>
  html {
    overflow-y: auto !important;
  }
</style>
