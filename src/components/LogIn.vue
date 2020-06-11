<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn class='log-in-button' color="white" dark v-on="on">
          Log In
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Log In
        </v-card-title>

        <v-card-text>
          Log in to a Reddit account to join, vote, and comment on all your favorite Reddit content.
        </v-card-text>

        <div class='input-container'>
          <v-text-field color='grey' v-model="username" @keydown='error = null' label="Username"></v-text-field>
          <v-text-field color='grey' v-model="password" @keydown='error = null' label="Password"></v-text-field>
        </div>

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
            Log In
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
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    submit () {
      axios.post('/login', {
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
    color: red !important;
  }
  .log-in-button {
    margin-right: 20px;
    color: black !important;
  }
</style>
