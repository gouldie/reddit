<template>
  <v-app-bar app color="indigo" light>
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />

    <v-spacer></v-spacer>

    <v-btn class='log-in-button'>Log In</v-btn>
    <!-- <v-btn>Sign Up</v-btn> -->
    <SignUp />
  </v-app-bar>
</template>

<script>
import SignUp from './SignUp'

export default {
  components: {
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
