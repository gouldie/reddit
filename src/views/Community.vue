<template>
  <div>
    <CommunityHeader :community='community' />
    <v-container>
      <v-row>
        <v-col cols='12' :md='8'>
          <CreatePostHeader v-if='isAuthenticated' />
          <PostFilter :sort='sort' @selectSort='selectSort' />
          <PostList :posts='posts' @vote='vote' />
        </v-col>
        <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
          <CommunityInfo :community='community' />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CommunityInfo from '@/components/Communities/Info.vue'
import CommunityHeader from '@/components/Communities/Header.vue'
import CreatePostHeader from '@/components/Posts/CreatePostHeader.vue'
import PostFilter from '@/components/Posts/PostFilter.vue'
import PostList from '@/components/Posts/PostList.vue'
import communities from '@/assets/json/communities.json'
import axios from 'axios'
import { calculateVote } from '@/utils.js'

export default {
  name: 'Community',
  components: {
    CreatePostHeader,
    PostFilter,
    PostList,
    CommunityInfo,
    CommunityHeader
  },
  data: function () {
    return {
      communities,
      sort: 'Best',
      posts: []
    }
  },
  methods: {
    selectSort (sort) {
      this.sort = sort
      this.getPosts()
    },
    vote (data) {
      calculateVote(this.posts.find(p => p._id === data.postId), data.type)
    },
    getPosts () {
      axios.get('/api/posts', {
        params: {
          communityId: this.community.id,
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
    },
    community () {
      return communities.find(e => e.name === this.$route.params.community)
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
