<template>
  <v-btn :small='small' color="blue" dark @click.stop="$store.commit('setModal', 'sign-up')">
    Sign Up
  </v-btn>
</template>

<script>
export default {
  props: [
    'small'
  ]
}
</script>
