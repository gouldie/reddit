<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePostHeader v-if='isAuthenticated' />
        <PostFilter :sort='sort' @selectSort='selectSort' />
        <PostList v-if='posts' :posts='posts' :showCommunity='true' @vote='vote' />
        <Spinner v-if='!posts' />
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <TopGrowing :communities='communities' />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import TopGrowing from '@/components/Communities/Top.vue'
import CreatePostHeader from '@/components/Posts/CreatePostHeader.vue'
import PostFilter from '@/components/Posts/PostFilter.vue'
import PostList from '@/components/Posts/PostList.vue'
import Spinner from '@/components/Core/Spinner.vue'
import communities from '@/assets/json/communities.json'
import axios from 'axios'
import { calculateVote } from '@/utils.js'

export default {
  name: 'Home',
  components: {
    CreatePostHeader,
    PostFilter,
    PostList,
    TopGrowing,
    Spinner
  },
  data: function () {
    return {
      communities,
      sort: 'Best',
      posts: null
    }
  },
  methods: {
    selectSort (sort) {
      this.sort = sort
      this.getPosts()
    },
    vote (data) {
      calculateVote(this.posts.find(p => p._id === data.postId), data.type)
      axios.post(`/api/posts/${data.type}`, {
        postId: data.postId
      })
    },
    getPosts () {
      this.posts = null
      axios.get('/api/posts', {
        params: {
          sort: this.sort
        }
      })
        .then(res => {
          if (res.data.success) {
            this.posts = res.data.posts.map(e => {
              const community = this.communities.find(c => c.id === e.communityId)

              return {
                ...e,
                communityName: community.name
              }
            })
          }
        })
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
