<template>
  <div class='post-list-container'>
    <div
      v-for='(post, i) in posts'
      :key='post ? post.id : i'
    >
      <router-link
        v-if='post'
        :to='`/post/${post._id}`'
      >
        <v-card>
          <PostPreview
            :post='post'
            :show-community='showCommunity'
            v-on='$listeners'
          />
        </v-card>
      </router-link>
      <ContentLoader v-if='!post' />
    </div>
  </div>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview.vue'
import ContentLoader from '@/components/Layout/ContentLoader.vue'

export default {
  props: [
    'posts',
    'showCommunity'
  ],
  components: {
    PostPreview,
    ContentLoader
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
