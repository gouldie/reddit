<template>
  <div class='community-header'>
    <div v-if='border' class='border'></div>
    <div class='main'>
      <v-container>
        <img class='icon' :src='src' />
        <v-card>
          <v-card-title>{{ community.title }}</v-card-title>
          <v-card-text>r/{{ community.name }}</v-card-text>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'border',
    'community'
  ],
  computed: {
    src () {
      let img
      try {
        img = require(`@/assets/images/community/${this.community.name}.png`)
      } catch (e) {
        img = require('@/assets/images/community/default.png')
      }
      return img
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';
  .v-card {
    box-shadow: none !important;
  }
  .v-card__title {
    font-size: 24px;
    padding: 0;
  }
  .v-card__text {
    padding: 0;
  }

  .border {
    height: 80px;
    background: #33a8ff;
  }
  .main {
    background: white;
  }
  .container {
    min-height: 80px;
    display: flex;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;

  }
  .icon {
    width: 60px;
    height: 60px;
    // background: #928ace;
    border-radius: 50%;
    margin-right: 20px;
    flex-shrink: 0;
  }
  // p {
  //   margin: 0;
  // }
  span {
    color: var(--v-info-darken1);
    margin-right: 2px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .v-card__title {
      font-size: 18px;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
     .v-card__title {
      font-size: 16px;
    }
    // h2 {
    //   font-size: 14px;
    // }
    // p {
    //   font-size: 12px;
    // }
    .icon {
      width: 50px;
      height: 50px;
    }
  }
</style>
