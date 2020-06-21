<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePostHeader v-if='isAuthenticated' />
        <p v-else>Popular posts</p>
        <PostFilter :filter='filter' @selectFilter='selectFilter' />
        <PostList :posts='posts' />
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <div>
          <p>Today's Top Growing Communities</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CreatePostHeader from '@/components/CreatePostHeader.vue'
import PostFilter from '@/components/PostFilter.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    CreatePostHeader,
    PostFilter,
    PostList
  },
  data: function () {
    return {
      filter: 'Best',
      posts: []
    }
  },
  methods: {
    selectFilter (filter) {
      this.filter = filter
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
          this.posts = res.data.posts
        }
      })
  }
}
</script>
