<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <CreatePost :subreddits='subreddits' />
      </v-col>
      <v-col cols='0' :md='4'>
        <div>
          <p>Posting to reddit</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreatePost from '@/components/CreatePost.vue'

export default {
  components: {
    CreatePost
  },
  data: function () {
    return {
      subreddits: [
        'gaming',
        'science',
        'cats'
      ]
    }
  }
}
</script>
