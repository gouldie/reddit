<template>
  <div class='comment-wrapper'>
    <div class='vote-panel' v-if='!hidden'>
      <v-icon
        dense
        :color='comment.userVote === 1 ? "green" : ""'
        @click.stop='vote("upvote")'
      >
        mdi-arrow-up-bold
      </v-icon>
      <v-icon
        dense
        :color='comment.userVote === -1 ? "red" : ""'
        @click.stop='vote("downvote")'
      >
        mdi-arrow-down-bold
      </v-icon>
      <div class='threadline-container' @click='hidden = true'>
        <div class='threadline' />
      </div>
    </div>
    <div class='vote-panel hidden' v-else>
      <v-icon
        small
        @click='hidden = false'
      >
        mdi-plus-circle
      </v-icon>
    </div>
    <div class='comment-container'>
      <v-card-text class='comment-header'>
        <span class='comment-user'>{{ comment.user.username }}</span>
        <span class='comment-points'>{{ comment.count }} points</span>
        <span class='comment-separator'>·</span>
        <span class='comment-time'><CustomTimeAgo :datetime='comment.createdAt' /></span>
      </v-card-text>
      <div v-if='!hidden'>
        <v-card-text class='comment-text' v-if='!isEditing'>
          {{ comment.text }}
        </v-card-text>
        <div class='editing-container' v-if='isEditing'>
          <TextField
            :value='editing'
            @onChange='editOnChange'
            placeholder='Text (optional)'
            :area='true'
          />
        </div>
        <CommentActions
          :showEditDelete='comment.canEdit'
          :showSave='isEditing'
          @onClick='onAction'
        />

        <div class='reply-container' v-if='isReplying'>
          <TextField
            @onChange='replyOnChange'
            placeholder='Reply'
          />
          <div class='d-flex justify-end mt-2'>
            <v-btn :small='true' color='blue' dark @click.stop='submitReply' :loading='submittingReply'>
              <template v-slot:loader>
                <span class='custom-loader'>
                  <v-icon dark>mdi-cached</v-icon>
                </span>
              </template>
              Reply
            </v-btn>
          </div>
        </div>

        <transition-group name='reply-list' tag='div'>
          <Comment
            v-for='reply in comment.replies'
            :key='reply._id'
            :comment='reply'
            :rootId='rootId'
            v-on='$listeners'
          />
        </transition-group>

        <DeleteComment
          v-if='modal'
          :commentId='comment._id'
          :rootId='rootId'
          v-on='$listeners'
          @closeModal='modal = false'
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommentActions from '@/components/Comments/CommentActions.vue'
import TextField from '@/components/Core/TextField.vue'
import DeleteComment from '@/components/Modals/DeleteComment.vue'
import CustomTimeAgo from '@/components/Core/TimeAgo.vue'
import axios from 'axios'

export default {
  name: 'Comment',
  props: [
    'comment',
    'rootId'
  ],
  components: {
    CommentActions,
    TextField,
    DeleteComment,
    CustomTimeAgo
  },
  data: function () {
    return {
      editing: false,
      replying: false,
      submittingReply: false,
      error: null,
      modal: false, // without a local modal variable, every comment will display a modal
      hidden: false
    }
  },
  computed: {
    isEditing () {
      return this.editing || this.editing === ''
    },
    isReplying () {
      return this.replying || this.replying === ''
    }
  },
  methods: {
    vote (type) {
      if (!this.$store.state.isAuthenticated) {
        this.$store.commit('setModal', 'log-in')
        return
      }

      this.$emit('vote', { type, rootId: this.rootId, commentId: this.comment._id })
    },
    onAction (action) {
      if (action === 'Reply') {
        this.toggleReply()
        return
      }

      if (action === 'Edit') {
        this.toggleEdit()
        return
      }

      if (action === 'Delete') {
        this.modal = true
        this.$store.commit('setModal', 'delete-comment')
        return
      }

      if (action === 'Save') {
        this.editComment()
      }
    },
    toggleEdit () {
      if (this.isEditing) {
        this.editing = false
        return
      }
      this.editing = this.comment.text
    },
    toggleReply () {
      if (this.isReplying) {
        this.replying = false
        return
      }

      if (!this.$store.state.isAuthenticated) {
        this.$store.commit('setModal', 'log-in')
        return
      }

      this.replying = ''
    },
    editOnChange (e) {
      this.editing = e
    },
    replyOnChange (e) {
      this.replying = e
    },
    editComment () {
      const request = this.rootId === this.comment._id
        ? axios.post('/api/comments/edit', {
          commentId: this.comment._id,
          text: this.comment.text && this.editing
        })
        : axios.post('/api/comments/reply/edit', {
          commentId: this.comment._id,
          rootId: this.rootId,
          text: this.comment.text && this.editing
        })

      request.then(res => {
        this.editing = false
        if (res.data.success) {
          this.$emit('updateComment', res.data.comment)
        }
      })
    },
    submitReply () {
      this.submittingReply = true

      axios.post('/api/comments/reply', {
        rootId: this.rootId,
        commentId: this.comment._id,
        text: this.replying
      })
        .then(res => {
          this.replying = false
          this.submittingReply = false

          if (res.data.success) {
            this.$emit('updateComment', res.data.comment)
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~vuetify/src/styles/styles.sass';

  .comment-wrapper {
    display: flex;
  }
  .comment-container {
    flex: 1;
  }
  .vote-panel {
    width: 36px;
    padding: 18px 0 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.hidden {
      margin-top: 2px;
    }
  }
  .comment-header {
    padding-bottom: 0;
  }
  .comment-user {
    font-weight: 300;
    margin-right: 8px;
  }
  .comment-points {
    font-weight: lighter;
    margin-right: 5px;
  }
  .comment-separator {
    color: grey;
    margin-right: 5px;
  }
  .comment-time {
    font-weight: lighter;
  }
  .comment-text {
    white-space: pre-line;
    padding: 5px 16px 4px;
  }
  i {
    cursor: pointer;
  }
  .editing-container {
    padding: 5px 16px 10px 16px;
  }
  .v-icon {
    z-index: 1;
  }
  .threadline-container {
    height: 100%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 10px;

    .threadline {
      height: 100%;
      width: 2px;
      background: #edeff1;
    }

    &:hover {
      .threadline {
        background: #d45757;
      }
    }
  }

  .reply-container {
    padding: 0 16px 0 12px;
  }

  .reply-list-enter-active, .reply-list-leave-active {
    transition: all 0.7s;
  }
  .reply-list-enter, .reply-list-leave-to {
    opacity: 0;
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .vote-panel, .comment-header, .comment-actions-container, .reply-container {
      padding-left: 0;
    }
    .editing-container, .comment-text, .comment-header {
      padding-left: 4px;
    }
    .threadline-container {
      margin-top: 5px;
    }
  }
</style>
