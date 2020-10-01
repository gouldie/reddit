<template>
  <img class='icon' :src='src' />
</template>

<script>
import randomcolor from 'random-color'

export default {
  props: [
    'word',
    'large',
    'communityName'
  ],
  computed: {
    src () {
      let img

      try {
        img = require(`@/assets/images/community/${this.communityName}.png`)
      } catch (e) {
        img = require('@/assets/images/community/default.png')
      }
      return img
    },
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
