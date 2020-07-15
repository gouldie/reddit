<template>
  <v-container v-if='post'>
    <v-row>
      <v-col cols='12' :md='8'>
        <v-card>
          <Post :post='post' :showCommunity='false' @vote='vote' :canEdit='true' />
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
import Post from '@/components/Posts/Post.vue'
import LeaveComment from '@/components/Comments/LeaveComment.vue'
import Comments from '@/components/Comments/Comments.vue'
import CommunityInfo from '@/components/Communities/Info.vue'

import axios from 'axios'
import communities from '@/assets/json/communities.json'
import { calculateVote } from '@/utils.js'

export default {
  components: {
    Post,
    LeaveComment,
    Comments,
    CommunityInfo
  },
  data: function () {
    return {
      post: null,
      error: null,
      community: {},
      comments: []
    }
  },
  methods: {
    vote (data) {
      // check if commentId exists and if so use data.comments[i] instead
      if (data.commentId) {
        calculateVote(this.comments.find(e => e._id === data.commentId), data.type)
        return
      }
      calculateVote(this.post, data.type)
    }
  },

  watch: {
    post () {
      const community = communities.find(c => c.id === this.post.communityId)

      this.post.communityName = community.name
    }
  },
  mounted () {
    axios.all([
      axios.get(`/api/posts/${this.$route.params.id}`),
      axios.get(`/api/comments/${this.$route.params.id}`)
    ]).then(res => {
      const [postRes, commentRes] = res

      if (!postRes.data.success) {
        this.error = postRes.data.message
        return
      }
      if (!commentRes.data.success) {
        this.error = commentRes.data.message
        return
      }

      const community = communities.find(c => c.id === postRes.data.post.communityId)

      postRes.data.post.communityName = community.name
      this.post = postRes.data.post
      this.comments = commentRes.data.comments
      this.community = community
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
