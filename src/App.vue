<template>
  <div>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </div>
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
