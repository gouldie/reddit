<template>
  <div>
    <div v-if='$store.state.isAuthenticated' >
      <v-card-text :class='$vuetify.breakpoint.smAndUp ? "comment-as" : "comment-as responsive"'>Comment as {{ $store.state.username }}</v-card-text>
      <TextArea :value='comment' @onChange='onChange' />
      <div :class='`action-buttons ${!$vuetify.breakpoint.smAndUp && "responsive"}`'>
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
import TextArea from '@/components/Core/TextArea.vue'

export default {
  components: {
    LogInButton,
    SignUpButton,
    TextArea
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
    },
    onChange (e) {
      this.comment = e
    }
  }
}
</script>

<style lang='scss' scoped>
 .comment-as {
    margin-top: 10px;
    padding: 0 30px 20px;

    &.responsive {
      padding: 0 10px 10px;
    }
  }
  .action-buttons {
    padding: 0 30px 20px;

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
