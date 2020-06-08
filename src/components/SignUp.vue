<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="blue" dark v-on="on">
          Sign Up
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Sign Up
        </v-card-title>

        <v-card-text>
          By having a Reddit account, you can join, vote, and comment on all your favorite Reddit content.
        </v-card-text>

        <div class='input-container'>
          <v-text-field color='grey' v-model="email" label="Email"></v-text-field>
          <v-text-field color='grey' v-model="username" label="Username"></v-text-field>
          <v-text-field color='grey' v-model="password" label="Password"></v-text-field>
        </div>

        <v-card-text class='error-text' v-if='error'>
          {{ error }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue" text @click="dialog = false">
            Back
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
      dialog: false,
      email: '',
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    submit () {
      console.log('submit sign up')
      axios.post('/register', {
        email: this.email,
        username: this.username,
        password: this.password
      })
        .then(res => {
          window.location.href = '/'
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .v-card__text {
    padding: 20px 24px !important;
  }
  .v-text-field {
    padding-top: 0 !important;
  }
  .input-container {
    padding: 12px 24px;
  }
  .error-text {
    padding-top: 0 !important;
  }
</style>
