<template>
  <div class='comment-container'>
    <div class='vote-panel' v-if='$vuetify.breakpoint.smAndUp'>
      <v-icon dense>arrow_upward</v-icon>
      <!-- <span>67</span> -->
      <v-icon dense>arrow_downward</v-icon>
    </div>
    <div>
      <v-card-text class='post-header'>
        <span class='post-user'>{{ comment.user.username }}</span>
        <span class='post-points'>55 points</span>
        <span class='post-time'>{{ formattedTime(comment.createdAt) }}</span>
      </v-card-text>
      <!-- <v-card-title class='post-title'>
        {{ comment.title }}
      </v-card-title> -->
      <v-card-text class='post-text' v-html='comment.text'>

      </v-card-text>
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'

export default {
  props: [
    'comment'
  ],
  methods: {
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-container {
    display: flex;
    // margin-bottom: 20px;
  }
  .vote-panel {
    width: 36px;
    padding: 16px 0 16px 16px;
  }
  .post-header {
    padding-bottom: 0;
  }
  .post-user {
    font-weight: 300;
    margin-right: 10px;
  }
  .post-points {
    font-weight: lighter;
    margin-right: 10px;
  }
  .post-time {
    font-weight: lighter;
  }
  .post-title {
    padding-top: 5px;
    padding-bottom: 10px;
  }
  .post-text {
    padding: 5px 16px;
  }
  i {
    cursor: pointer;
  }
</style>