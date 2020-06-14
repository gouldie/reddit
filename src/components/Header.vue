<template>
  <v-app-bar app color='#fff'>
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />

    <v-spacer></v-spacer>

    <LogOut v-if='isAuthenticated' />
    <LogIn v-if='!isAuthenticated' />
    <SignUp v-if='!isAuthenticated' />
  </v-app-bar>
</template>

<script>
import LogIn from './LogIn'
import SignUp from './SignUp'
import LogOut from './LogOut'

export default {
  components: {
    LogIn,
    SignUp,
    LogOut
  },
  methods: {
    redirect () {
      window.location.href = '/'
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
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
