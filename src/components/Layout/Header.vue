<template>
  <v-app-bar app color='#fff'>
    <img id='logo' @click='redirect' src='https://1000logos.net/wp-content/uploads/2017/05/Reddit-logo.png' />

    <v-spacer></v-spacer>

    <v-menu offset-y min-width="100">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if='isAuthenticated || $vuetify.breakpoint.xs'
          dark
          icon
          v-bind="attrs"
          v-on="on"
          color='black'
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in isAuthenticated ? itemsAuth : itemsNoAuth"
          :key="i"
        >
          <v-list-item-title @click='item.action'>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div v-if='!isAuthenticated && $vuetify.breakpoint.smAndUp'>
      <LogInButton />
      <SignUpButton />
    </div>

    <LogInModal />
    <SignUpModal />
  </v-app-bar>
</template>

<script>
import LogInModal from '@/components/Modals/LogIn.vue'
import SignUpModal from '@/components/Modals/SignUp.vue'
import LogInButton from '@/components/Buttons/LogIn.vue'
import SignUpButton from '@/components/Buttons/SignUp.vue'
import axios from 'axios'

export default {
  components: {
    LogInModal,
    SignUpModal,
    LogInButton,
    SignUpButton
  },
  data: function () {
    return {
      itemsAuth: [
        {
          title: 'User Settings',
          action: () => this.$router.push('/settings')
        },
        {
          title: 'Log Out',
          action: () => this.logout()
        }
      ],
      itemsNoAuth: [
        {
          title: 'Log In',
          action: () => this.$store.commit('setModal', 'log-in')
        },
        {
          title: 'Sign Up',
          action: () => this.$store.commit('setModal', 'sign-up')
        }
      ]
    }
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
  @import '~vuetify/src/styles/styles.sass';

  #logo {
    width: 50px;
    cursor: pointer;
  }
  .log-in-button {
    margin-right: 20px;
    color: black !important;
  }
  .v-list {
    padding: 0;
  }
  .v-list-item {
    cursor: pointer;
    &:hover {
      background: rgb(246, 246, 246);
    }
  }
</style>
