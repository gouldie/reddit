<template>
  <div>
    <NotFound v-if='postNotFound' resource='post' />
    <div>
      <CommunityHeader
        :border='true'
        :community='community'
        v-if='community'
      />
      <v-container>
        <v-row>
          <v-col cols='12' :md='8'>
            <ContentLoader :large='true' v-if='!post' />
            <v-card v-if='post'>
              <PostFull
                :post='post'
                :showCommunity='false'
                @vote='vote'
                :canEdit='post.canEdit'
                @editPost='editPost'
                @editOnChange='editOnChange'
                :editing='editing'
                :toggleEdit='toggleEdit'
                :commentCount='commentCount'
              />
              <LeaveComment @addComment='addComment' />
              <CommentList
                v-if='comments.length > 0'
                :comments='comments'
                @vote='vote'
                @updateComment='updateComment'
                @deleteComment='deleteComment'
                @sort='sortComments'
              />
            </v-card>
          </v-col>
          <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
            <CommunityInfo v-if='community' :community='community' />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import PostFull from '@/components/Posts/PostFull.vue'
import LeaveComment from '@/components/Comments/LeaveComment.vue'
import CommentList from '@/components/Comments/CommentList.vue'
import CommunityInfo from '@/components/Communities/Info.vue'
import CommunityHeader from '@/components/Communities/Header.vue'
import NotFound from '@/components/Core/NotFound.vue'
import ContentLoader from '@/components/Layout/ContentLoader.vue'

import axios from 'axios'
import communities from '@/assets/json/communities.json'
import { calculateVote } from '@/utils.js'

export default {
  components: {
    PostFull,
    LeaveComment,
    CommentList,
    CommunityInfo,
    CommunityHeader,
    NotFound,
    ContentLoader
  },
  data: function () {
    return {
      postNotFound: false,
      post: null,
      error: null,
      // community: {},
      comments: [],
      editing: false,
      community: communities.find(c => c.name === this.$route.params.community)
    }
  },
  methods: {
    vote (data) {
      if (data.commentId) {
        if (data.rootId && (data.rootId !== data.commentId)) {
          const findReply = (arr, id) => {
            return arr.reduce((acc, e) => {
              if (e._id === id) return e
              const result = findReply(e.replies, id)
              if (result) return result
              return acc
            }, 0)
          }

          const rootReplies = this.comments.find(e => e._id === data.rootId).replies
          const reply = findReply(rootReplies, data.commentId)

          calculateVote(reply, data.type)
          axios.post(`/api/comments/reply/${data.type}`, {
            commentId: data.commentId,
            rootId: data.rootId
          })
        } else {
          calculateVote(this.comments.find(e => e._id === data.commentId), data.type)
          axios.post(`/api/comments/${data.type}`, {
            commentId: data.commentId
          })
        }
      } else {
        calculateVote(this.post, data.type)
        axios.post(`/api/posts/${data.type}`, {
          postId: data.postId
        })
      }
    },
    getPost () {
      axios.get(`/api/posts/${this.$route.params.id}`)
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            this.postNotFound = true
            return
          }

          const community = communities.find(c => c.id === res.data.post.communityId)

          res.data.post.communityName = community.name
          this.post = res.data.post
          this.community = community

          this.getComments()
        })
    },
    getComments (sort = 'Top') {
      axios.get(`/api/comments/${this.$route.params.id}`, {
        params: {
          sort
        }
      })
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
        text: this.post.text && this.editing,
        image: this.post.image && this.editing,
        link: this.post.link && this.editing
      })
        .then(res => {
          if (!res.data.success) {
            this.error = res.data.message
            return
          }

          this.post.text = res.data.post.text
          this.post.image = res.data.post.image
          this.post.link = res.data.post.link
          this.post.linkPreview = res.data.post.linkPreview
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
      this.editing = this.post.text || this.post.image || this.post.link
    },
    deleteComment (id) {
      this.comments = this.comments.filter(e => e._id !== id)
    },
    updateComment (comment) {
      const index = this.comments.findIndex(e => e._id === comment._id)
      this.comments.splice(index, 1, comment)
    },
    addComment (comment) {
      this.comments.unshift(comment)
    },
    sortComments (sort) {
      this.getComments(sort)
    }
  },
  computed: {
    isEditing () {
      return this.editing || this.editing === ''
    },
    commentCount () {
      const flat = (doc) => {
        return doc.reduce((acc, val) => {
          return acc + 1 + (val.replies ? flat(val.replies) : 0)
        }, 0)
      }

      return flat(this.comments)
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
  }
}
</script>
