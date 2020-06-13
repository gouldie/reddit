<template>
  <v-btn class='log-out-button' color="blue" dark @click="submit">
    Log Out
  </v-btn>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    submit () {
      axios.get('/api/users/logout')
        .then(() => {
          window.location.href = '/'
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
