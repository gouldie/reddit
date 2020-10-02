<template>
  <div>
    <div class='post-container'>
      <VotePanel :post='post' v-on='$listeners' :extraPadding='true' />
      <div class='post-content-container'>
        <div>
          <v-card-text class='post-header'>
            <Avatar v-if='showCommunity && $vuetify.breakpoint.smAndUp' :communityName='post.communityName' />
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

          <div v-if='post.image && !isEditing' class='post-image'>
            <img :src='post.image' />
          </div>

          <a :href='createLink' target='_blank' v-if='post.link && !isEditing'>
            {{ post.link }}
          </a>

          <div :class='isEditing && "editing-container"'>
            <TextField v-if='post.text && isEditing' :value='editing' @onChange='editOnChange' placeholder='Text (optional)' :area='true' />
            <DropZone v-if='post.image && isEditing' @addImage='addImage' :initialImage='post.image' />
            <TextField v-if='post.link && isEditing' :value='editing' @onChange='editOnChange' placeholder='Url' />
          </div>

          <PostActions
            :showEditDelete='canEdit'
            :showSave='isEditing'
            :commentCount='commentCount'
            @onClick='onAction'
            :post='post'
            v-on='$listeners'
          />
        </div>
        <LinkPreview v-if='post.link' :link='createLink' :preview='post.linkPreview' />
      </div>

      <DeletePost :postId='post._id' />
    </div>
    <!-- <v-card-actions v-if='canEdit' class='post-actions-container'>
      <div>
        <VotePanel :post='post' :mobile='true' v-on='$listeners' />
        <v-card-text :class='isEditing && "selected"' @click='toggleEdit'><v-icon small>edit</v-icon> Edit</v-card-text>
        <v-card-text @click.stop='$store.commit("setModal", "delete-post")'><v-icon small>delete</v-icon> Delete</v-card-text>
      </div>
      <div>
        <v-card-text v-if='isEditing' @click='editPost'><v-icon small>save</v-icon> Save</v-card-text>
      </div>
    </v-card-actions> -->
  </div>
</template>

<script>
import timeago from 'time-ago'
import Avatar from '@/components/Communities/Avatar.vue'
import TextField from '@/components/Core/TextField.vue'
import VotePanel from '@/components/Posts/VotePanel.vue'
import DropZone from '@/components/Core/DropZone.vue'
import DeletePost from '@/components/Modals/DeletePost.vue'
import LinkPreview from '@/components/Posts/LinkPreview.vue'
import PostActions from '@/components/Posts/PostActions.vue'

export default {
  components: {
    Avatar,
    TextField,
    VotePanel,
    DropZone,
    DeletePost,
    LinkPreview,
    PostActions
  },
  props: [
    'post',
    'showCommunity',
    'canEdit',
    'toggleEdit',
    'editing',
    'commentCount'
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
    },
    addImage (image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)

      reader.onload = (event) => {
        this.$emit('editOnChange', event.target.result)
      }
    },
    onAction (action) {
      if (action === 'Comments') {
        document.querySelector('.comments-list').scrollIntoView()
        return
      }

      if (action === 'Edit') {
        if (this.toggleEdit) this.toggleEdit()
        return
      }

      if (action === 'Delete') {
        this.$store.commit('setModal', 'delete-post')
        return
      }

      if (action === 'Save') {
        this.editPost()
      }
    }
  },
  computed: {
    isEditing () {
      return this.editing || this.editing === ''
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
  .post-text {
    white-space: pre-line;
  }
  a {
    display: inline-block;
    padding: 0 16px;
    color: #65ade4;
    text-decoration: none;
    word-break: break-all;
    &:hover {
      text-decoration: underline;
    }
  }
  .post-image {
    width: 90%;
    margin: 10px auto 0;
    border-radius: 3px;
    img {
      max-width: 100%;
    }
  }
  .v-card__title {
    padding-top: 10px;
    padding-bottom: 10px;
    word-break: break-word;
  }
  i {
    cursor: pointer;
  }
  .editing-container {
    padding: 5px 16px 10px 16px;
  }
  .v-input {
    font-size: 0.875rem !important;
  }
  // .post-actions-container {
  //   >div {
  //     display: flex;
  //     align-items: center;
  //     flex-wrap: wrap;
  //   }
  //   justify-content: space-between;
  //   padding: 0 45px;

  //   .v-card__text {
  //     display: flex;
  //     width: inherit;
  //     padding: 2px 5px;
  //     cursor: pointer;
  //     border-radius: 10px;

  //     &.selected {
  //       background: #dcdcdc;
  //     }
  //   }
  // }
  .post-content-container {
    padding-right: 36px;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    >div:nth-of-type(1) {
      flex-grow: 1
    }
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
    // .post-actions-container {
    //   padding: 0 10px 10px;
    // }
    // .post-header {
    //   font-size: 12px;
    // }
  }
</style>
