<template>
  <div class='post-list-container'>
    <div
      v-for='(post, i) in posts'
      :key='post ? post.id : i'
    >
      <router-link
        v-if='post'
        :to='postUrl(post.communityId, post._id)'
      >
        <v-card>
          <PostPreview
            :post='post'
            :show-community='showCommunity'
            v-on='$listeners'
            :postUrl='postUrl(post.communityId, post._id)'
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
import communitiesJSON from '@/assets/json/communities.json'

export default {
  props: [
    'posts',
    'showCommunity'
  ],
  components: {
    PostPreview,
    ContentLoader
  },
  methods: {
    postUrl (communityId, postId) {
      return `/r/${communitiesJSON.find(c => c.id === communityId).name}/${postId}`
    }
  }
}
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
</style>
