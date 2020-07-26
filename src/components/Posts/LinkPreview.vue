<template>
  <div class='link-preview' v-if='post.link' :style='`background-image: url(${post.linkPreview});`' @click.stop='$emit("clickLink", post.link)'>
    <v-icon class='link-preview-center' color='blue' v-if='!post.linkPreview'>link</v-icon>
    <v-icon class='link-preview-corner' color='blue' small>link</v-icon>
  </div>
</template>

<script>
export default {
  props: [
    'post'
  ]
}
</script>

<style lang="scss" scoped>
  .link-preview {
    display: flex;
    justify-content: center;
    min-width: 100px;
    height: 100px;
    margin: 25px 0;
    background-size: cover;
    position: relative;
    left: 10px;
    border: 1px solid var(--v-blue-base);
    border-radius: 4px;
    img {
      width: 100%;
    }
    .link-preview-corner {
      position: absolute;
      height: 14px;
      bottom: 0;
      right: 0;
    }
    .link-preview-center {
      transform: rotate(-45deg);
    }
  }
</style>
