<template>
  <div class='post-list-container'>
    <v-card v-for='post in posts' :key='post.id'>
      <div class='vote-panel' v-if='$vuetify.breakpoint.smAndUp'>
        <v-icon dense>arrow_upward</v-icon>
        <span>67</span>
        <v-icon dense>arrow_downward</v-icon>
      </div>
      <div>
        <v-card-text class='post-header'>
          <span class='post-community'>r/funny</span>
          <span class='post-user'>Posted by u/matt</span>
          <span class='post-time'>6 hours ago</span>
        </v-card-text>
        <v-card-title class='post-title'>
          An example title
        </v-card-title>
        <v-card-text class='post-text'>
          I play Apex, Battlefront 2, Modern Warfare, Pokemon Sword and Shield. I have a messed up sleep cycle so I stream and record all day mostly. I'm in the EST. I got around 401 subscribers on youtube and I'm looking for a partner I can stream and record with who has random humor and can improv and go with random humor. I don't play games extremely serious but I'd like a partner who is competent at the games they play but also doesnt get mad at losing. Message me on Discord or reddit if interested - MohistSage#4390 Also sidenote I'm trying to create a group of content creators so if you're down for that as well lets talk.
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [
    'posts'
  ]
}
</script>

<style scoped lang="scss">
  .vote-panel {
    width: 60px;
    padding: 16px 0 16px 16px;
  }
  .v-card {
    margin-bottom: 20px;
    display: flex;
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
