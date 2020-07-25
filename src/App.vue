<template>
  <v-app light color='blue'>
    <Header />
    <v-content color='blue'>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/Layout/Header'

export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
    //
  })
}
</script>

<style lang='scss'>
  @import '~vuetify/src/styles/styles.sass';

  html {
    overflow-y: auto !important;
  }
  .container {
    max-width: 1185px;
  }
  .v-content {
    background-color: #dae0e7;
  }
  .black-gradient {
    background: linear-gradient(#484848, #252525);
  }

  .v-card__title {
    font-size: 18px;
    line-height: 22px;
  }
  .v-card__subtitle {
    font-weight: 500;
    font-size: 16px;
  }
  .v-card__text {
    font-size: 14px;
  }

  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    .container {
      padding-top: 30px;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .v-card__title {
      font-size: 16px;
    }
    .v-card__subtitle {
      font-size: 14px;
    }
    .v-card__text {
      font-size: 12px;
    }
    .v-input {
      font-size: 12px;
    }
  }
</style>
