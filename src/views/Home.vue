<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePostHeader v-if='isAuthenticated' />
        <PostFilter :filter='filter' @selectFilter='selectFilter' />
        <PostList :posts='posts' :showCommunity='true' @vote='vote' />
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
import communities from '@/assets/json/communities.json'
import axios from 'axios'
import { calculateVote } from '@/utils.js'

export default {
  name: 'Home',
  components: {
    CreatePostHeader,
    PostFilter,
    PostList,
    TopGrowing
  },
  data: function () {
    return {
      communities,
      filter: 'Best',
      posts: []
    }
  },
  methods: {
    selectFilter (filter) {
      this.filter = filter
    },
    vote (data) {
      calculateVote(this.posts.find(p => p._id === data.postId), data.type)
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  },
  mounted () {
    axios.get('/api/posts')
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
}
</script>
