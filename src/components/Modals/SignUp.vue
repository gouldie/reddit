<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Sign Up
        </v-card-title>

        <v-card-text>
          By having a Reddit account, you can join, vote, and comment on all your favorite Reddit content.
        </v-card-text>

        <v-form ref="form" v-model="valid" lazy-validation @submit.prevent='submit'>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="emailRules"
            color='grey'
            @keydown='error = null'
          >
          </v-text-field>
          <v-text-field
            label="Username"
            v-model="username"
            :rules="usernameRules"
            color='grey'
            @keydown='error = null'
          >
          </v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
            :rules="passwordRules"
            color='grey'
            @keydown='error = null'
            type='password'
          >
          </v-text-field>
          <input type='submit' style='display: none;' />
        </v-form>

        <v-card-text class='error-text' v-if='error'>
          {{ error }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue" text @click="submit">
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => (v && v.length <= 254) || 'Email must be less than 255 characters',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 3 && v.length <= 15) || 'Username must be between 3 and 15 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6 && v.length <= 30) || 'Password must be between 6 and 30 characters'
      ],
      error: null
    }
  },
  methods: {
    submit () {
      if (!this.$refs.form.validate()) {
        return
      }
      axios.post('/api/users/register', {
        email: this.email,
        username: this.username,
        password: this.password
      })
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          window.location.href = '/'
        })
    }
  },
  computed: {
    dialog: {
      get () {
        return this.$store.state.modal === 'sign-up'
      },
      set () {
        this.$store.commit('setModal', null)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .v-card__text {
    padding: 20px 24px 10px !important;
  }
  form {
    padding: 0 24px 20px;
  }
  .error-text {
    padding-top: 0 !important;
    color: red !important;
    position: relative;
    top: -10px;
  }
</style>
