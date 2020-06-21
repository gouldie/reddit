<template>
  <div class='post-list-container'>
    <v-card v-for='post in posts' :key='post.id'>
      <Post :post='post' />
    </v-card>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  props: [
    'posts'
  ],
  components: {
    Post
  }
}
</script>

<style scoped lang="scss">

</style>
