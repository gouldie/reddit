<template>
  <v-btn class='log-in-button' :small='small' color='white' dark @click.stop='$store.commit("setModal", "log-in")'>
    Log In
  </v-btn>
</template>

<script>
export default {
  props: [
    'small'
  ]
}
</script>

<style scoped>
  button {
    margin-right: 20px;
    color: black !important;
  }
</style>
