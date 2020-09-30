<template>
  <div class='post-list-container'>
    <div
      v-for='(post, i) in posts'
      :key='post ? post.id : i'
    >
      <router-link
        v-if='post'
        :to='`/r/${getCommunityName(post.communityId)}/${post._id}`'
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
    getCommunityName (id) {
      return communitiesJSON.find(c => c.id === id).name
    }
  }
}
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
</style>
