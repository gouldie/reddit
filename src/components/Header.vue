<template>
  <v-app-bar app color="indigo" light>
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />

    <v-spacer></v-spacer>

    <LogIn />
    <SignUp />
  </v-app-bar>
</template>

<script>
import LogIn from './LogIn'
import SignUp from './SignUp'

export default {
  components: {
    LogIn,
    SignUp
  },
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
  .log-in-button {
    margin-right: 20px;
  }
</style>
