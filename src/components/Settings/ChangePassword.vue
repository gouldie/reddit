<template>
  <div class='change-password-container'>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header>Change password</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form ref='form' v-model='valid' lazy-validation @submit.prevent='submit'>
            <v-text-field
              placeholder='Current password'
              v-model='currentPassword'
              dense
              type='password'
              :rules='currentPasswordRules'
              @keydown='error = null'
            >
            </v-text-field>
            <v-text-field
              placeholder='New password'
              v-model='newPassword'
              dense
              type='password'
              :rules='newPasswordRules'
              @keydown='error = null'
            >
            </v-text-field>
            <v-text-field
              placeholder='Confirm new password'
              v-model='confirmNewPassword'
              dense
              type='password'
              :rules='confirmNewPasswordRules'
              @keydown='error = null'
            >
            </v-text-field>
            <v-card-text class='error-text' v-if='error'>
              {{ error }}
            </v-card-text>
            <div class='button-container'>
              <v-spacer />
              <v-btn
                small
                dark
                color='blue'
                type='submit'
              >
                Change
              </v-btn>
            </div>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar v-model='snackbar'>
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function () {
    return {
      valid: true,
      currentPassword: '',
      currentPasswordRules: [
        v => !!v || 'Current password is required',
        v => (v && v.length >= 6 && v.length <= 30) || 'Current password must be between 6 and 30 characters'
      ],
      newPassword: '',
      newPasswordRules: [
        v => !!v || 'New password is required',
        v => (v && v.length >= 6 && v.length <= 30) || 'New password must be between 6 and 30 characters'
      ],
      confirmNewPassword: '',
      confirmNewPasswordRules: [
        v => !!v || 'New password is required',
        v => (v && v.length >= 6 && v.length <= 30) || 'New password must be between 6 and 30 characters',
        v => v === this.newPassword || 'New passwords must match'
      ],
      error: null,
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    submit () {
      if (!this.$refs.form.validate()) {
        return
      }

      this.error = null

      axios.post('/api/users/password', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          this.$refs.form.reset()
          this.snackbar = true
          this.snackbarText = 'Your password has been updated'
        })
    }
  }
}
</script>

<style lang="scss">
  .change-password-container {
    .button-container {
      display: flex;
      margin-top: 10px;
    }
  }
  .v-expansion-panel-header {
    padding: 16px;
    font-size: 14px;
  }
  .v-expansion-panel-content__wrap {
    padding: 0 16px 16px;
  }
  .error-text {
    padding: 0 !important;
    color: red !important;
  }
</style>
