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
      <v-card-text class='post-text'>
        {{ textShort }}
      </v-card-text>
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

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .v-card__title {
      font-size: 16px;
      line-height: 20px;
    }
    .post-text {
      font-size: 12px;
    }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .post-content-container {
      padding-right: 0;
    }
    .post-header {
      font-size: 12px;
    }
  }
</style>
