<template>
  <v-app-bar app color='#fff'>
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />

    <v-spacer></v-spacer>

    <LogInButton v-if='!isAuthenticated' />
    <SignUpButton v-if='!isAuthenticated' />
    <LogOutButton v-if='isAuthenticated' />

    <LogInModal />
    <SignUpModal />
  </v-app-bar>
</template>

<script>
import LogInModal from '@/components/Modals/LogIn.vue'
import SignUpModal from '@/components/Modals/SignUp.vue'
import LogInButton from '@/components/Buttons/LogIn.vue'
import SignUpButton from '@/components/Buttons/SignUp.vue'
import LogOutButton from '@/components/Buttons/LogOut.vue'

export default {
  components: {
    LogInModal,
    SignUpModal,
    LogInButton,
    SignUpButton,
    LogOutButton
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
    color: black !important;
  }
</style>
