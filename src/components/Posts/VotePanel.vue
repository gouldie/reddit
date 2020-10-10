<template>
  <div :class='{
    "vote-panel": !mobile,
    "vote-panel-mobile": mobile,
    greyBackground,
    extraPadding
  }'>
    <v-icon
      data-testid='upvote-button'
      dense
      :color='post.userVote === 1 ? "green" : ""'
      @click.prevent='vote("upvote")'
    >
      mdi-arrow-up-bold
    </v-icon>
    <span data-testid='vote-count'>{{ post.count }}</span>
    <v-icon
      data-testid='downvote-button'
      dense
      :color='post.userVote === -1 ? "red" : ""'
      @click.prevent='vote("downvote")'
    >
      mdi-arrow-down-bold
    </v-icon>
  </div>
</template>

<script>
export default {
  props: [
    'mobile',
    'post',
    'greyBackground',
    'extraPadding'
  ],
  methods: {
    vote (type) {
      if (!this.$store.state.isAuthenticated) {
        this.$store.commit('setModal', 'log-in')
        return
      }

      this.$emit('vote', { type, postId: this.post._id })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';
  button {
    border-radius: 2px;

    &:hover {
      background: #ebebeb;
    }
    &:focus::after {
      opacity: 0 !important;
    }
  }

  .vote-panel {
    width: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px;
    border-radius: 4px;

    &.greyBackground {
      background-color: #f8f9fa;
    }
    &.extraPadding {
      padding: 16px 0 16px 16px;
    }
  }
  .vote-panel-mobile {
    display: none;
    flex-direction: row;
    align-items: center;
    margin-right: 5px;
    width: auto;
    padding: 0;

    >* {
      padding: 0 1px;
    }

    button {
      margin: 0 2px;
    }

    button:nth-of-type(2) {
      top: 1px;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .vote-panel {
      display: none;
    }
    .vote-panel-mobile {
      display: flex;
    }
    span {
      // font-size: 12px;
      color: rgb(135, 138, 140);
      font-weight: bold;
    }
  }
</style>
