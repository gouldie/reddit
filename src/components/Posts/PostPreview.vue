<template>
  <div class='post-container'>
    <VotePanel :post='post' v-on='$listeners' :greyBackground='true' />
      <div style='display: flex; flex-grow: 1; flex-direction: column;'>
        <div class='post-content-container'>
          <div>
            <v-card-text class='post-header'>
              <Avatar v-if='showCommunity && $vuetify.breakpoint.smAndUp' :communityName='post.communityName' />
              <router-link
                v-if='showCommunity'
                class='post-community'
                :to='`r/${post.communityName}`'
              >
                <span>r/{{post.communityName}}</span>
              </router-link>
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

            <a class='post-link' :href='createLink' target='_blank' v-if='post.link' @click.stop>
              {{ post.link }}
            </a>
          </div>
          <LinkPreview v-if='post.link' :link='createLink' :preview='post.linkPreview' />
        </div>

        <PostActions :commentCount='post.commentCount' @onClick='onAction' :post='post' v-on='$listeners' />
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import Avatar from '@/components/Communities/Avatar.vue'
import VotePanel from '@/components/Posts/VotePanel.vue'
import LinkPreview from '@/components/Posts/LinkPreview.vue'
import PostActions from '@/components/Posts/PostActions.vue'

export default {
  components: {
    Avatar,
    VotePanel,
    LinkPreview,
    PostActions
  },
  props: [
    'post',
    'showCommunity',
    'postUrl'
  ],
  methods: {
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    },
    onAction (action) {
      if (action === 'Comments') {
        this.$router.push(this.postUrl + '?scroll=comments')
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
    },
    createLink () {
      if (!this.post.link.startsWith('http')) {
        return 'http://' + this.post.link
      } else {
        return this.post.link
      }
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '~vuetify/src/styles/styles.sass';
  .post-container {
    display: flex;
    margin-bottom: 20px;
  }
  .post-header {
    padding-top: 12px;
    padding-bottom: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .post-community {
    font-weight: 500;
    margin-right: 10px;
    color: black;
    text-decoration: none;
  }
  .post-user {
    font-weight: lighter;
    margin-right: 10px;
  }
  .post-text {
    white-space: pre-line;
  }
  .post-time {
    font-weight: lighter;
  }
  .post-link {
    padding: 0 16px 16px;
    display: inline-block;
    color: #65ade4;
    word-break: break-all;
    text-decoration: none;
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
  }
</style>
