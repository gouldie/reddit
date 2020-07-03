<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePost :communities='communities' />
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <div>
          <PostingRules />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreatePost from '@/components/Posts/CreatePost.vue'
import PostingRules from '@/components/Posts/PostingRules.vue'
import communities from '@/assets/json/communities.json'

export default {
  components: {
    CreatePost,
    PostingRules
  },
  data: function () {
    return {
      communities
    }
  }
}
</script>
