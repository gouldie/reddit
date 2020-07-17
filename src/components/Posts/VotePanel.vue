<template>
  <div :class='`${mobile ? "vote-panel-mobile" : "vote-panel"}`'>
    <v-icon
      dense
      :color='post.userVote === 1 ? "green" : ""'
      @click.stop='test'
    >
      mdi-arrow-up-bold
    </v-icon>
    <span>{{ post.count }}</span>
    <v-icon
      dense
      :color='post.userVote === -1 ? "red" : ""'
      @click.stop='$emit("vote", { type: "downvote" })'
    >
      mdi-arrow-down-bold
    </v-icon>
  </div>
</template>

<script>
export default {
  props: [
    'mobile',
    'post'
  ],
  methods: {
    test () {
      this.$emit('vote', { type: 'upvote' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';

  .vote-panel {
    width: 36px;
    padding: 16px 0 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .vote-panel-mobile {
    display: none;
    flex-direction: row;
    width: auto;
    padding: 0;
    >* {
      padding: 0 1px;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .vote-panel {
      display: none;
    }
    .vote-panel-mobile {
      display: inline-block;
    }
    span {
      font-size: 12px;
    }
  }
</style>
