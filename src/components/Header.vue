<template>
  <v-app-bar app color='#fff'>
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />

    <v-spacer></v-spacer>

    <v-btn v-if='!isAuthenticated' class='log-in-button' color="white" dark @click.stop="$store.commit('setModal', 'log-in')">
      Log In
    </v-btn>
    <v-btn v-if='!isAuthenticated' color="blue" dark @click.stop="$store.commit('setModal', 'sign-up')">
      Sign Up
    </v-btn>
    <v-btn v-if='isAuthenticated' color="blue" dark @click="logout">
      Log Out
    </v-btn>

    <SignUp />
    <LogIn />
  </v-app-bar>
</template>

<script>
import LogIn from './LogIn'
import SignUp from './SignUp'
import axios from 'axios'

export default {
  components: {
    LogIn,
    SignUp
  },
  methods: {
    redirect () {
      window.location.href = '/'
    },
    logout () {
      axios.get('/api/users/logout')
        .then(() => {
          window.location.href = '/'
        })
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
    color: black !important;
  }
</style>
