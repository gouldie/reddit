<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ resource ? capitalizeResource : 'Page' }} not found
      </v-card-title>
      <v-card-subtitle>
        The {{ resource || 'page' }} you requested does not exist
      </v-card-subtitle>
      <v-card-text>
        <router-link to='/'>Back to home</router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: [
    'resource'
  ],
  computed: {
    capitalizeResource () {
      return this.resource.charAt(0).toUpperCase() + this.resource.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-card {
    text-align: center;
    .v-card__title {
      justify-content: center;
      margin-bottom: 5px;
    }
  }
</style>
