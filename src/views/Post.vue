<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <v-card>
          <Post v-if='post' :post='post' :showCommunity='true' @vote='vote' />
          <TextArea v-if='editing' :value='editing' @onChange='editOnChange' />
          <v-card-actions :class='!$vuetify.breakpoint.smAndUp && "responsive"'>
            <div>
              <v-card-text @click='toggleEdit'><v-icon small>edit</v-icon> Edit</v-card-text>
              <v-card-text @click='deleting = true'><v-icon small>delete</v-icon> Delete</v-card-text>
            </div>
            <div>
              <v-card-text v-if='editing' @click='toggleEdit'><v-icon small>save</v-icon> Save</v-card-text>
            </div>
          </v-card-actions>
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
import TextArea from '@/components/Core/TextArea.vue'

import axios from 'axios'
import communities from '@/assets/json/communities.json'
import { calculateVote } from '@/utils.js'

export default {
  components: {
    Post,
    LeaveComment,
    Comments,
    CommunityInfo,
    TextArea
  },
  data: function () {
    return {
      post: null,
      error: null,
      comments: [],
      community: null,
      editing: false,
      deleting: false
    }
  },
  methods: {
    vote (data) {
      // check if commentId exists and if so use data.comments[i] instead
      if (data.commentId) {
        calculateVote(this.comments.find(e => e._id === data.commentId), data.type)
      }
      calculateVote(this.post, data.type)
    },
    toggleEdit () {
      if (this.editing) {
        this.editing = false
        return
      }
      this.editing = this.post.text
    },
    editOnChange (e) {
      this.editing = e
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
  .v-card__actions {
    justify-content: space-between;
    padding: 0 30px 20px;
    margin-top: -10px;

    .v-card__text {
      display: inline-block;
      width: inherit;
      padding: 0;
      margin-right: 10px;
      cursor: pointer;
    }
    &.responsive {
      padding: 0 10px 10px;
    }
  }
  .editing-container {
    padding: 0 30px 20px;
    &.responsive {
      padding: 0 10px 10px;
    }
  }
  .v-input, .editr--content {
    font-size: 0.875rem !important;
  }
</style>
