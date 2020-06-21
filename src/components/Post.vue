<template>
  <div class='post-container'>
    <div class='vote-panel' v-if='$vuetify.breakpoint.smAndUp'>
      <v-icon dense>arrow_upward</v-icon>
      <span>67</span>
      <v-icon dense>arrow_downward</v-icon>
    </div>
    <div>
      <v-card-text class='post-header'>
        <span class='post-community'>{{ `r/${post.communityName}` }}</span>
        <span class='post-user'>Posted by u/matt</span>
        <span class='post-time'>6 hours ago</span>
      </v-card-text>
      <v-card-title class='post-title'>
        {{ post.title }}
      </v-card-title>
      <v-card-text class='post-text'>
        {{ post.text }}
      </v-card-text>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'post'
  ]
}
</script>

<style scoped lang="scss">
  .post-container {
    display: flex;
    margin-bottom: 20px;
  }
  .vote-panel {
    width: 60px;
    padding: 16px 0 16px 16px;
  }
  .post-header {
    padding-bottom: 0;
  }
  .post-community {
    font-weight: 500;
    margin-right: 10px;
  }
  .post-user {
    font-weight: lighter;
    margin-right: 10px;
  }
  .post-time {
    font-weight: lighter;
  }
  .post-title {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  i {
    cursor: pointer;
  }
</style>
