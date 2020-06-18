<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePostHeader v-if='isAuthenticated' />
        <p v-else>Popular posts</p>
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

export default {
  name: 'Home',
  components: {
    CreatePostHeader
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.isAuthenticated
    }
  }
}
</script>
