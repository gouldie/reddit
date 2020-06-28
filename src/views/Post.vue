<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <v-card>
          <Post v-if='post' :post='post' />
          <div :class='$vuetify.breakpoint.smAndUp ? "comments-container" : "comments-container responsive"'>
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
          <Comments :comments='comments' />
        </v-card>
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <div>
          <p>Community Information</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from '@/components/Post.vue'
import Comments from '@/components/Comments.vue'
import axios from 'axios'
import communities from '@/assets/json/communities.json'

export default {
  components: {
    Post,
    Comments
  },
  data: function () {
    return {
      post: null,
      error: null,
      comment: '',
      comments: [
        {
          user: {
            _id: '123',
            username: 'matt'
          },
          createdAt: Date.now(),
          text: 'text adsadsads adsads d'
        }
      ]
    }
  },
  methods: {
    submit () {

    }
  },
  mounted () {
    axios.get(`/api/posts/${this.$route.params.id}`)
      .then(res => {
        if (!res.data.success) {
          this.error = res.data.message
          return
        }

        const community = communities.find(c => c.id === res.data.post.communityId)

        res.data.post.communityName = community.name
        this.post = res.data.post
      })
  }
}
</script>

<style scoped lang="scss">
  .comment-as {
    padding: 0 0 15px;
  }
  .comments-container {
    padding: 0 30px 10px;

    &.responsive {
      padding: 0 10px 10px;
    }
  }
  // .comment-as {
  //   padding: 0 50px 10px;
  // }
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  button {
    margin-left: 15px;
  }
  // .v-card__actions {
  //   padding: 8px 50px !important;
  // }
</style>
