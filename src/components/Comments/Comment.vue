<template>
  <div class='comment-wrapper'>
    <div class='vote-panel' v-if='$vuetify.breakpoint.smAndUp'>
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
      <div class='threadline' />
    </div>
    <div class='comment-container'>
      <v-card-text class='comment-header'>
        <span class='comment-user'>{{ comment.user.username }}</span>
        <span class='comment-points'>{{ comment.count }} points</span>
        <span class='comment-separator'>·</span>
        <span class='comment-time'>{{ formattedTime(comment.createdAt) }}</span>
      </v-card-text>
      <v-card-text class='comment-text' v-if='!isEditing'>
        {{ comment.text }}
      </v-card-text>
      <div class='editing-container' v-if='isEditing'>
        <TextField
          :value='editing'
          @onChange='editOnChange'
          placeholder='Text (optional)'
        />
      </div>
      <CommentActions
        :showEditDelete='comment.canEdit'
        :showSave='isEditing'
        @onClick='onAction'
      />

      <TextField
        v-if='isReplying'
        @onChange='replyOnChange'
        placeholder='Reply'
      />

      <Comment
        v-for='reply in comment.replies'
        :key='reply._id'
        :comment='reply'
      />

      <DeleteComment v-if='modal' :commentId='comment._id' v-on='$listeners' @closeModal='modal = false' />
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import CommentActions from '@/components/Comments/CommentActions.vue'
import TextField from '@/components/Core/TextField.vue'
import DeleteComment from '@/components/Modals/DeleteComment.vue'
import axios from 'axios'

export default {
  name: 'Comment',
  props: [
    'comment'
  ],
  components: {
    CommentActions,
    TextField,
    DeleteComment
  },
  data: function () {
    return {
      editing: false,
      replying: false,
      error: null,
      modal: false // without a local modal variable, every comment will display a modal
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
    formattedTime (timestamp) {
      return timeago.ago(timestamp)
    },
    vote (type) {
      if (!this.$store.state.isAuthenticated) {
        this.$store.commit('setModal', 'log-in')
        return
      }

      this.$emit('vote', { type, commentId: this.comment._id })
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
        this.editPost()
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
      this.replying = ''
    },
    editOnChange (e) {
      this.editing = e
    },
    replyOnChange (e) {
      this.replying = e
    },
    editPost () {
      axios.post('/api/comments/edit', {
        commentId: this.comment._id,
        text: this.comment.text && this.editing
      })
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          this.comment.text = res.data.comment.text
          this.editing = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-wrapper {
    display: flex;
  }
  .comment-container {
    flex: 1;
  }
  .vote-panel {
    width: 36px;
    padding: 16px 0 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding: 5px 16px 2px;
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
  .threadline {
    height: 100%;
    width: 2px;
    background: #edeff1;
    position: relative;
    cursor: pointer;

    &:hover {
      background: #d45757;
    }
  }
</style>
