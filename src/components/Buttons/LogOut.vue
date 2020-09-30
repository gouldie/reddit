<template>
  <v-btn color='blue' dark @click='logout'>
    Log Out
  </v-btn>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    logout () {
      axios.get('/api/users/logout')
        .then(() => {
          window.location.href = '/'
        })
    }
  }
}
</script>

<style scoped>

</style>
