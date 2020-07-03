<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePost :communities='communities' />
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <div>
          <PostingRules v-if='!community' />
          <CommunityInfo v-if='community' :community='community' />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreatePost from '@/components/Posts/CreatePost.vue'
import PostingRules from '@/components/Posts/PostingRules.vue'
import communities from '@/assets/json/communities.json'
import CommunityInfo from '@/components/Communities/Info.vue'

export default {
  components: {
    CreatePost,
    PostingRules,
    CommunityInfo
  },
  data: function () {
    return {
      communities
    }
  },
  computed: {
    community () {
      if (!this.$route.params.community) return null

      return communities.find(e => e.name === this.$route.params.community)
    }
  }
}
</script>
