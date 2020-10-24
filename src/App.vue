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
  .v-dialog {
    margin: 24px 12px;
  }
  .v-content {
    background-color: #dae0e7;
  }
  .black-gradient {
    background: linear-gradient(#484848, #252525);
  }

  textarea {
    line-height: 22px !important;
  }
  .v-textarea .v-text-field__slot {
    padding-bottom: 8px;
  }

  .v-card__title {
    font-size: 18px;
    line-height: 22px;
  }
  .v-card__subtitle {
    font-weight: 500;
    font-size: 16px;
  }
  .v-card__text, a {
    font-size: 14px;
  }
  .v-input {
    font-size: 14px;

    label {
      font-size: 14px;
    }

    &.borderless {
      .v-input__slot {
        box-shadow: none !important;
      }

      .v-select__selection {
        color: #37423c !important;
      }

      .v-input__control {
        display: flex;
        justify-content: center;
        position: relative;
        top: -1.5px;
      }

      i {
        color: #878a8c !important;
      }
    }
  }

  span {
    font-size: 14px;
  }

  // required for issue: https://github.com/vuetifyjs/vuetify/issues/11781
  div.v-snack:not(.v-snack--absolute) {
    height: 100%;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  .v-menu__content .v-list {
    padding: 0;

    .v-list-item {
      cursor: pointer;
      min-height: 38px;
      padding: 0 10px;

      &:hover {
        background: rgb(246, 246, 246);
      }
    }

    .v-icon {
      transform: rotate(45deg);
      margin-right: 5px;
    }

    .v-list-item__title {
      font-size: 12px;
    }
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media #{map-get($display-breakpoints, 'sm-and-up')} {
    .container {
      padding-top: 30px;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .modal-title.v-card__title {
      font-size: 20px !important;
    }
    .v-input__slot {
      min-height: 30px !important;
    }
    .v-card__title {
      font-size: 16px;
    }
    .v-card__subtitle {
      font-size: 14px;
    }
    .v-card__text, a {
      font-size: 12px;
      line-height: 20px;
    }
    .v-input {
      font-size: 12px;

      label {
        font-size: 12px;
      }
    }
    span {
      font-size: 12px;
    }
  }
</style>
