<template>
  <div class='post-list-container'>
    <v-card v-for='post in posts' :key='post.id' @click='$router.push(`/post/${post._id}`)'>
      <Post :post='post' :showCommunity='showCommunity' />
    </v-card>
  </div>
</template>

<script>
import Post from '@/components/Posts/Post.vue'

export default {
  props: [
    'posts',
    'showCommunity'
  ],
  components: {
    Post
  }
}
</script>

<style scoped lang="scss">

</style>
