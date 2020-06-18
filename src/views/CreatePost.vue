<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePost :communities='communities' />
      </v-col>
      <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <div>
          <p>Posting to reddit</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreatePost from '@/components/CreatePost.vue'
import communities from '@/assets/json/communities.json'

export default {
  components: {
    CreatePost
  },
  data: function () {
    return {
      communities
    }
  }
}
</script>
