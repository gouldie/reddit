<template>
  <div class='post-list-container'>
    <v-card v-for='post in posts' :key='post.id' @click.native.stop='$router.push(`/post/${post._id}`)'>
      <PostPreview :post='post' :showCommunity='showCommunity' v-on="$listeners" />
    </v-card>
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
  .v-card {
    cursor: pointer;
  }
</style>
