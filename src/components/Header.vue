<template>
  <v-app-bar
    app
    color="indigo"
    dark
  >
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    redirect () {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped lang="scss">
  #logo {
    width: 50px;
    cursor: pointer;
  }
</style>
