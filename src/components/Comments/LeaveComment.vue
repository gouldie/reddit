<template>
  <div class='leave-comment-container'>
    <div v-if='$store.state.isAuthenticated' >
      <v-card-text class='comment-as'>Comment as {{ $store.state.username }}</v-card-text>
      <TextField :value='comment' @onChange='onChange' />
      <div class='action-buttons'>
        <v-btn small color='primary' @click='submit' :disabled='!comment'>
          Comment
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
import TextField from '@/components/Core/TextField.vue'

export default {
  components: {
    LogInButton,
    SignUpButton,
    TextField
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
  @import '~vuetify/src/styles/styles.sass';
  .leave-comment-container {
    padding: 0 50px 20px;

    &.responsive {
      padding: 0 10px 10px;
    }
  }
 .comment-as {
    margin-top: 10px;
    padding: 16px 0 5px;
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    button:nth-of-type(2) {
      margin-right: 0;
    }
  }
  .v-card__actions {
    padding-bottom: 16px;

    button {
    margin: 0 8px;
  }
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .leave-comment-container {
      padding: 0 10px 10px;
    }
  }
</style>
