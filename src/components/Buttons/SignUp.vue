<template>
  <v-btn class='sign-up-button' :small='small' color='blue' dark @click.stop='$store.commit(&apos;setModal&apos;, &apos;sign-up&apos;)'>
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
