<template>
  <div class='icon'>
  </div>
</template>

<script>
import randomcolor from 'random-color'

export default {
  // functionality to add random color / letter to an icon. may use in future
  props: [
    'word',
    'large'
  ],
  computed: {
    letter () {
      return this.word.charAt(0).toUpperCase()
    },
    color (word) {
      return randomcolor().hexString()
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    display: inline-block;
  }
  .icon {
    background: rgb(154, 188, 206);
    height: 25px;
    width: 25px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
  }
</style>
