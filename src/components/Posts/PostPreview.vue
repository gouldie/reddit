<template>
  <div class='post-container'>
    <VotePanel :post='post' v-on="$listeners" />
    <div class='post-content-container'>
      <v-card-text class='post-header'>
        <Icon v-if='showCommunity && $vuetify.breakpoint.smAndUp' />
        <span v-if='showCommunity'><a @click.stop='$router.push("/r/" + post.communityName)'><span class='post-community'>{{ `r/${post.communityName}` }}</span></a></span>
        <span class='post-user'>Posted by u/{{ post.user.username }}</span>
        <span class='post-time'>{{ formattedTime(post.createdAt) }}</span>
      </v-card-text>
      <v-card-title>
        {{ post.title }}
      </v-card-title>
      <v-card-text v-if='post.text' class='post-text'>
        {{ textShort }}
      </v-card-text>
      <div v-if='post.image' class='post-image' :style='`background-image: url(${post.image});`'>
      </div>
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import Icon from '@/components/Communities/Icon.vue'
import VotePanel from '@/components/Posts/VotePanel.vue'

export default {
  components: {
    Icon,
    VotePanel
  },
  props: [
    'post',
    'showCommunity'
  ],
  methods: {
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    }
  },
  computed: {
    textShort () {
      const length = this.post.text.length
      if (length > 300) {
        return this.post.text.slice(0, 250).trim() + '...'
      }
      return this.post.text
    }
  },
  mounted () {
    console.log(typeof this.post.image)
  }
}
</script>

<style scoped lang="scss">
  @import '~vuetify/src/styles/styles.sass';
  .post-container {
    display: flex;
    margin-bottom: 20px;
  }
  .post-header {
    padding-bottom: 0;
    display: flex;
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
  .v-card__title {
    padding-top: 10px;
    padding-bottom: 10px;
    word-break: break-word;
  }
  i {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black !important;
    z-index: 99999;
  }
  .post-content-container {
    padding-right: 36px;
    flex: 1;
  }
  .post-image {
    width: 90%;
    margin: 0 auto;
    border-radius: 3px;
    height: 200px;
    background-position: center;
    margin-bottom: 16px;
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .post-content-container {
      padding-right: 0;
    }
  }
</style>
