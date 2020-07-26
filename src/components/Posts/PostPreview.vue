<template>
  <div class='post-container'>
    <VotePanel :post='post' v-on="$listeners" :greyBackground='true' />
    <div class='post-content-container'>
      <div>
        <v-card-text class='post-header'>
          <Avatar v-if='showCommunity && $vuetify.breakpoint.smAndUp' />
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
        <div v-if='post.image' class='post-image' :style='`background-image: url(${post.image});`'></div>

        <v-card-text v-if='post.link' class='post-link' @click.stop='clickLink(post.link)'>
          {{ post.link }}
        </v-card-text>
      </div>
      <LinkPreview v-if='post.link' :post='post' @clickLink='clickLink' />
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import Avatar from '@/components/Communities/Avatar.vue'
import VotePanel from '@/components/Posts/VotePanel.vue'
import LinkPreview from '@/components/Posts/LinkPreview.vue'

export default {
  components: {
    Avatar,
    VotePanel,
    LinkPreview
  },
  props: [
    'post',
    'showCommunity'
  ],
  methods: {
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    },
    clickLink (url) {
      if (!url.startsWith('http')) {
        window.open('http://' + url)
      } else {
        window.open(url)
      }
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
    flex-wrap: wrap;
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
  .post-link {
    padding-top: 0;
    color: #65ade4;
    word-break: break-all;
    &:hover {
      text-decoration: underline;
    }
  }
  .post-title-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .v-card__title {
    padding-top: 12px;
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
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    >div:nth-of-type(1) {
      flex-grow: 1
    }
  }
  .post-image {
    width: 90%;
    margin: 10px auto 20px;
    border-radius: 3px;
    height: 200px;
    background-position: center;
    background-size: cover;
    max-height: 300px;
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .post-content-container {
      padding-right: 0;
    }
    .link-preview {
      left: 0;
      margin: 16px;
      min-width: 75px;
      height: 75px;
    }
  }
</style>
