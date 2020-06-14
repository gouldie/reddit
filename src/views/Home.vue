<template>
  <v-container>
      <v-row>
        <v-col cols='12' :md='8'>
          <CreatePost v-if='isAuthenticated' />
          <p v-else>Popular posts</p>
        </v-col>
        <v-col cols='0' :md='4'>
          <div>
            <p>Today's Top Growing Communities</p>
          </div>
        </v-col>
      </v-row>

  </v-container>
</template>

<script>
// @ is an alias to /src
import CreatePost from '@/components/CreatePost.vue'

export default {
  name: 'Home',
  components: {
    CreatePost
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>
