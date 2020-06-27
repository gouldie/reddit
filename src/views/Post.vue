<template>
  <v-container>
    <v-row>
      <v-col cols='12' :md='8'>
        <v-card>
          <Post v-if='post' :post='post' />
          <v-card-actions>
            <wysiwyg
              v-if='$vuetify.breakpoint.smAndUp'
              v-model='comment'
              style='margin-top: -10px;'
              placeholder='What are you thoughts?'
            />
            <v-textarea
              v-if='!$vuetify.breakpoint.smAndUp'
              outlined
              v-model='comment'
              label="What are your thoughts?"
            ></v-textarea>
          </v-card-actions>
        </v-card>
      </v-col>
       <v-col :md='4' v-if='$vuetify.breakpoint.mdAndUp'>
        <div>
          <p>Community Information</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from '@/components/Post.vue'
import axios from 'axios'
import communities from '@/assets/json/communities.json'

export default {
  components: {
    Post
  },
  data: function () {
    return {
      post: null,
      error: null,
      comment: ''
    }
  },
  mounted () {
    axios.get(`/api/posts/${this.$route.params.id}`)
      .then(res => {
        if (!res.data.success) {
          this.error = res.data.message
          return
        }

        const community = communities.find(c => c.id === res.data.post.communityId)

        res.data.post.communityName = community.name
        this.post = res.data.post
      })
  }
}
</script>

<style scoped lang="scss">
  .v-card__actions {
    padding: 8px 50px !important;
  }
</style>
