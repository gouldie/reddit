<template>
  <v-app light color="blue">
    <Header />
    <v-content color="blue">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/Layout/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
