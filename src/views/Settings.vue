<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon>settings</v-icon>
        User settings
      </v-card-title>

      <v-card-subtitle>
        Account Preferences
      </v-card-subtitle>
      <v-divider />

      <ChangePassword />
    </v-card>
  </v-container>
</template>

<script>
import ChangePassword from '@/components/Settings/ChangePassword.vue'

export default {
  components: {
    ChangePassword
  }
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: 600px !important;
    padding: 24px 12px;
  }
  .v-card__title {
    margin-bottom: 20px;
  }
  .v-icon {
    margin-right: 10px;
  }
  .v-card__subtitle {
    padding-bottom: 10px;
  }
  .v-divider {
    margin: 0 16px;
  }
</style>
