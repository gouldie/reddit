<template>
  <div class='post-list-container'>
    <router-link :to='`/post/${post._id}`' v-for='post in posts' :key='post.id' >
      <v-card>
        <PostPreview :post='post' :showCommunity='showCommunity' v-on="$listeners" />
      </v-card>
    </router-link>
  </div>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'

export default {
  props: [
    'posts',
    'showCommunity'
  ],
  components: {
    PostPreview
  }
}
</script>

<style scoped lang="scss">
  // .v-card {
  //   cursor: pointer;
  // }
  a {
    text-decoration: none;
  }
</style>
