<template>
  <div class='post-container'>
    <div class='vote-panel' v-if='$vuetify.breakpoint.smAndUp'>
      <v-icon
        dense
        :color='post.userVote === 1 ? "green" : ""'
        @click.stop='$emit("vote", { type: "upvote" })'
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
    <div :class='`post-content-container ${!$vuetify.breakpoint.smAndUp && "responsive"}`'>
      <v-card-text class='post-header'>
        <Icon v-if='showCommunity' />
        <a v-if='showCommunity' @click.stop='$router.push("/r/" + post.communityName)'><span class='post-community'>{{ `r/${post.communityName}` }}</span></a>
        <span class='post-user'>Posted by u/{{ post.user.username }}</span>
        <span class='post-time'>{{ formattedTime(post.createdAt) }}</span>
      </v-card-text>
      <v-card-title class='post-title'>
        {{ post.title }}
      </v-card-title>
      <v-card-text v-if='!isEditing' class='post-text' v-html='postText'></v-card-text>

      <div :class='editing && "editing-container"'>
        <TextArea v-if='isEditing' :value='editing' @onChange='editOnChange' placeholder='Text (optional)' />
      </div>
      <v-card-actions v-if='canEdit' :class='`post-actions-container ${!$vuetify.breakpoint.smAndUp && "responsive"}`'>
        <div>
          <v-card-text :class='isEditing && "selected"' @click='toggleEdit'><v-icon small>edit</v-icon> Edit</v-card-text>
          <v-card-text @click='deleting = true'><v-icon small>delete</v-icon> Delete</v-card-text>
        </div>
        <div>
          <v-card-text v-if='editing' @click='editPost'><v-icon small>save</v-icon> Save</v-card-text>
        </div>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import Icon from '@/components/Communities/Icon.vue'
import TextArea from '@/components/Core/TextArea.vue'

export default {
  components: {
    Icon,
    TextArea
  },
  props: [
    'post',
    'showCommunity',
    'canEdit',
    'toggleEdit',
    'editing'
  ],
  data: function () {
    return {
      deleting: false
    }
  },
  methods: {
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    },
    editOnChange (e) {
      this.$emit('editOnChange', e)
    },
    editPost () {
      this.$emit('editPost')
    }
  },
  computed: {
    isEditing () {
      return this.editing || this.editing === ''
    },
    postText () {
      return this.post.text.replace(/<([^>\s]+)[^>]*>(?:\s*(?:<br \/>|&nbsp;|&thinsp;|&ensp;|&emsp;|&#8201;|&#8194;|&#8195;)\s*)*<\/\1>/, '')
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
  .editing-container {
    padding: 0 16px 10px 16px;
    &.responsive {
      padding: 0 10px 10px;
    }
  }
  .v-input, .editr--content {
    font-size: 0.875rem !important;
  }
  .post-actions-container {
    justify-content: space-between;
    padding: 0 16px 0 10px;
    // margin-top: -10px;

    .v-card__text {
      display: inline-block;
      width: inherit;
      padding: 2px 5px;
      cursor: pointer;
      border-radius: 10px;

      &:nth-of-type(2) {
        margin-left: 10px;
      }

      &.selected {
        background: #dcdcdc;
      }
    }
    &.responsive {
      padding: 0 10px 10px;
    }
  }
  .post-content-container {
    padding-right: 36px;
    flex: 1;
    &.responsive {
      padding-right: 0;
    }
  }
</style>
