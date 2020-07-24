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
      <v-card-text v-if='post.text && !isEditing' class='post-text'>
        {{ post.text }}
      </v-card-text>
      <div v-if='post.image && !isEditing' class='post-image' :style='`background-image: url(${post.image});`'></div>

      <div :class='isEditing && "editing-container"'>
        <TextField v-if='isEditing' :value='editing' @onChange='editOnChange' placeholder='Text (optional)' :area='true' />
      </div>
      <v-card-actions v-if='canEdit' class='post-actions-container'>
        <div>
          <VotePanel :post='post' :mobile='true' v-on="$listeners" />
          <v-card-text :class='isEditing && "selected"' @click='toggleEdit'><v-icon small>edit</v-icon> Edit</v-card-text>
          <v-card-text @click='deleting = true'><v-icon small>delete</v-icon> Delete</v-card-text>
        </div>
        <div>
          <v-card-text v-if='isEditing' @click='editPost'><v-icon small>save</v-icon> Save</v-card-text>
        </div>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import Icon from '@/components/Communities/Icon.vue'
import TextField from '@/components/Core/TextField.vue'
import VotePanel from '@/components/Posts/VotePanel.vue'

export default {
  components: {
    Icon,
    TextField,
    VotePanel
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
  .post-image {
    width: 90%;
    margin: 0 auto;
    border-radius: 3px;
    height: 200px;
    background-position: center;
    margin-bottom: 16px;
    background-size: cover;
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
  .editing-container {
    padding: 5px 16px 10px 16px;
  }
  .v-input {
    font-size: 0.875rem !important;
  }
  .post-actions-container {
    >div {
      display: flex;
      align-items: center;
    }
    justify-content: space-between;
    padding: 0 16px 0 10px;

    .v-card__text {
      display: inline-block;
      width: inherit;
      padding: 2px 5px;
      cursor: pointer;
      border-radius: 10px;

      &:nth-of-type(2) {
        // margin-left: 10px;
      }

      &.selected {
        background: #dcdcdc;
      }
    }
  }
  .post-content-container {
    padding-right: 36px;
    flex: 1;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    // .v-card__title {
    //   font-size: 16px;
    //   line-height: 20px;
    // }
    // .post-text {
    //   font-size: 12px;
    // }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .post-content-container {
      padding-right: 0;
    }
    .post-actions-container {
      padding: 0 10px 10px;
    }
    // .post-header {
    //   font-size: 12px;
    // }
  }
</style>
