<template>
  <a :href='link' target='_blank' :style='`background-image: url(${preview});`' @click.stop>
    <v-icon class='link-preview-center' color='blue' v-if='!preview'>link</v-icon>
    <v-icon class='link-preview-corner' color='blue' small>link</v-icon>
  </a>
</template>

<script>
export default {
  props: [
    'link',
    'preview'
  ]
}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';

  a {
    display: flex;
    justify-content: center;
    min-width: 100px;
    height: 100px;
    // margin: 25px 0;
    background-size: cover;
    position: relative;
    left: 10px;
    border: 1px solid var(--v-blue-base);
    border-radius: 4px;
    cursor: pointer;
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
  @media #{map-get($display-breakpoints, 'xs-only')} {
    a {
      left: 0;
      margin: 16px 16px 0 0;
      min-width: 75px;
      height: 75px;
    }
  }
</style>
