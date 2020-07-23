<template>
  <v-container v-if='post'>
    <v-row>
      <v-col cols='12' :md='8'>
        <v-card>
          <PostFull
            :post='post'
            :showCommunity='false'
            @vote='vote'
            :canEdit='post.canEdit'
            @editPost='editPost'
            @editOnChange='editOnChange'
            :editing='editing'
            :toggleEdit='toggleEdit'
          />
          <LeaveComment />
          <Comments :comments='comments' @vote='vote'/>
        </v-card>
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <CommunityInfo v-if='community' :community='community' />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostFull from '@/components/Posts/PostFull.vue'
import LeaveComment from '@/components/Comments/LeaveComment.vue'
import Comments from '@/components/Comments/Comments.vue'
import CommunityInfo from '@/components/Communities/Info.vue'

import axios from 'axios'
import communities from '@/assets/json/communities.json'
import { calculateVote } from '@/utils.js'

export default {
  components: {
    PostFull,
    LeaveComment,
    Comments,
    CommunityInfo
  },
  data: function () {
    return {
      post: null,
      error: null,
      community: {},
      comments: [],
      editing: false
    }
  },
  methods: {
    vote (data) {
      if (!this.$store.state.isAuthenticated) {
        this.$store.commit('setModal', 'log-in')
        return
      }

      if (data.commentId) {
        calculateVote(this.comments.find(e => e._id === data.commentId), data.type)
        axios.post(`/api/comments/${data.type}`, {
          commentId: data.commentId
        })
          .then(res => {
          // emit to parent
            this.$emit('vote', { commentId: data.commentId, type: data.type })
          })
      } else {
        calculateVote(this.post, data.type)
        axios.post(`/api/posts/${data.type}`, {
          postId: this.post._id
        })
          .then(res => {
          // emit to parent
            this.$emit('vote', { postId: this.post._id, type: data.type })
          })
      }
    },
    getPost () {
      axios.get(`/api/posts/${this.$route.params.id}`)
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          const community = communities.find(c => c.id === res.data.post.communityId)

          res.data.post.communityName = community.name
          this.post = res.data.post
          this.community = community
        })
    },
    getComments () {
      axios.get(`/api/comments/${this.$route.params.id}`)
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          this.comments = res.data.comments
        })
    },
    editPost () {
      axios.post('/api/posts/edit', {
        postId: this.post._id,
        text: this.editing
      })
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          this.post.text = res.data.post.text
          this.editing = false
        })
    },
    editOnChange (e) {
      this.editing = e
    },
    toggleEdit () {
      if (this.editing || this.editing === '') {
        this.editing = false
        return
      }
      this.editing = this.post.text
    }
  },
  computed: {
    isEditing () {
      return this.editing || this.editing === ''
    }
  },
  watch: {
    post () {
      const community = communities.find(c => c.id === this.post.communityId)

      this.post.communityName = community.name
    }
  },
  mounted () {
    this.getPost()
    this.getComments()
  }
}
</script>

<style lang="scss" scoped>

</style>
