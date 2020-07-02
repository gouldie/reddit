<template>
  <div :class='$vuetify.breakpoint.smAndUp ? "leave-comment-container" : "leave-comment-container responsive"'>
      <div v-if='$store.state.isAuthenticated' >
        <v-card-text class='comment-as'>Comment as {{ $store.state.username }}</v-card-text>
        <div>
          <wysiwyg
            v-if='$vuetify.breakpoint.smAndUp'
            v-model='comment'
            style='margin-top: -10px;'
            placeholder='What are you thoughts?'
          />
          <v-textarea
            v-if='!$vuetify.breakpoint.smAndUp'
            outlined
            v-model='comment'
            label="What are your thoughts?"
          ></v-textarea>
        </div>
        <div class='action-buttons'>
          <v-btn width='100' @click='back()'>
            Cancel
          </v-btn>
          <v-btn color='primary' width='80' @click="submit" :disabled='!comment'>
            Post
          </v-btn>
        </div>
      </div>
      <v-card outlined v-if='!$store.state.isAuthenticated'>
        <v-card-text>Log in or sign up to leave a comment</v-card-text>
        <v-card-actions>
          <LogInButton small />
          <SignUpButton small />
        </v-card-actions>

      </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import LogInButton from '@/components/Buttons/LogIn.vue'
import SignUpButton from '@/components/Buttons/SignUp.vue'

export default {
  components: {
    LogInButton,
    SignUpButton
  },
  data: function () {
    return {
      comment: ''
    }
  },
  methods: {
    submit () {
      axios.post('/api/comments', {
        postId: this.$route.params.id,
        text: this.comment
      })
        .then(res => {
          window.location.reload()
        })
    }
  }
}
</script>

<style lang='scss' scoped>
 .comment-as {
    padding: 0 0 20px;
  }
  .leave-comment-container {
    padding: 0 30px 10px;

    .v-card {
      display: flex;
    }

    &.responsive {
      padding: 0 10px 10px;
    }
  }
  button {
    margin: 0 8px;
  }
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    button:nth-of-type(2) {
      margin-right: 0;
    }
  }
</style>
