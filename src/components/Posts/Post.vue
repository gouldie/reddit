<template>
  <div class='post-container'>
    <div class='vote-panel' v-if='$vuetify.breakpoint.smAndUp'>
      <v-icon
        dense
        :color='post.userVote === 1 ? "green" : ""'
        @click.stop='vote("upvote")'
      >
        mdi-arrow-up-bold
      </v-icon>
      <span>{{ post.count }}</span>
      <v-icon
        dense
        :color='post.userVote === -1 ? "red" : ""'
        @click.stop='vote("downvote")'
      >
        mdi-arrow-down-bold
      </v-icon>
    </div>
    <div>
      <v-card-text class='post-header'>
        <a v-if='showCommunity' @click.stop='$router.push("/r/" + post.communityName)'><span class='post-community'>{{ `r/${post.communityName}` }}</span></a>
        <span class='post-user'>Posted by u/{{ post.user.username }}</span>
        <span class='post-time'>{{ formattedTime(post.createdAt) }}</span>
      </v-card-text>
      <v-card-title class='post-title'>
        {{ post.title }}
      </v-card-title>
      <v-card-text class='post-text' v-html='post.text'>

      </v-card-text>
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import axios from 'axios'

export default {
  props: [
    'post',
    'showCommunity'
  ],
  methods: {
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    },
    vote (type) {
      axios.post(`/api/posts/${type}`, {
        postId: this.post._id
      })
        .then(res => {
          // emit to parent
          this.$emit('vote', { postId: this.post._id, type })
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .post-container {
    display: flex;
    margin-bottom: 20px;
  }
  .vote-panel {
    width: 36px;
    padding: 16px 0 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding-top: 5px;
    padding-bottom: 10px;
  }
  i {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black !important;
    z-index: 99999;
  }
</style>
