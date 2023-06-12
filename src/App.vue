<template>
  <v-app light color="blue">
    <GlobalHeader />
    <v-content color="blue">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import GlobalHeader from '@/components/Layout/Header.vue'

export default {
  name: 'App',
  components: {
    GlobalHeader
  }
}
</script>
