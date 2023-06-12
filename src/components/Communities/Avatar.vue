<template>
  <img class="icon" :src="src" />
</template>

<script>
import randomcolor from 'random-color'

export default {
  props: ['word', 'large', 'communityName'],
  computed: {
    src() {
      return new URL(`../../assets/images/community/${this.communityName}.png`, import.meta.url)
        .href
    },
    letter() {
      return this.word.charAt(0).toUpperCase()
    },
    color() {
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
