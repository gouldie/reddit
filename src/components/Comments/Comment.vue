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
    </div>
  </div>
</template>

<script>
import timeago from 'time-ago'
import CommentActions from '@/components/Comments/CommentActions.vue'
import TextField from '@/components/Core/TextField.vue'
import axios from 'axios'

export default {
  props: [
    'comment'
  ],
  components: {
    CommentActions,
    TextField
  },
  data: function () {
    return {
      editing: false,
      error: null
    }
  },
  computed: {
    isEditing () {
      return this.editing || this.editing === ''
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
        return
      }

      if (action === 'Edit') {
        this.toggleEdit()
        return
      }

      if (action === 'Delete') {
        this.$store.commit('setModal', 'delete-comment')
        return
      }

      if (action === 'Save') {
        this.editPost()
      }
    },
    toggleEdit () {
      if (this.editing || this.editing === '') {
        this.editing = false
        return
      }
      this.editing = this.comment.text
    },
    editOnChange (e) {
      this.editing = e
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
</style>
