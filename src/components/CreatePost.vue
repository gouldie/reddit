<template>
  <div>
    <h3>Create a post</h3>
    <v-divider />
    <v-select
      :items="prefixedCommunities"
      item-text='name'
      item-value='id'
      label="Choose a community"
      outlined
      dense
      color='grey'
      v-model='communityId'
    ></v-select>
    <v-tabs
      fixed-tabs
      background-color="indigo"
      dark
      v-model='tab'
    >
      <v-tab
        v-for='item in items'
        :key='item'
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model='tab'>
      <v-tab-item
        v-for='item in items'
        :key='item'
        :reverse-transition='false'
        :transition='false'
      >
        <v-card flat tile>
          <v-card-actions>
            <v-text-field
              outlined
              dense
              counter='300'
              placeholder='Title'
              v-model='title'
            ></v-text-field>
          </v-card-actions>

          <v-card-actions>
            <wysiwyg v-if='tab === 0 && $vuetify.breakpoint.smAndUp' v-model='text' style='margin-top: -10px;' placeholder='Text (optional)' />
            <v-textarea
              v-if='tab === 0 && !$vuetify.breakpoint.smAndUp'
              outlined
              v-model='text'
              label="Text (optional)"
            ></v-textarea>
          </v-card-actions>

          <v-card-actions class='action-buttons'>
            <v-btn width='100' @click='back()'>
              Cancel
            </v-btn>
            <v-btn color='primary' width='80' @click="submit" :disabled='!communityId || !title'>
              Post
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: [
    'communities'
  ],
  data: function () {
    return {
      communityId: null,
      tab: 0,
      items: [
        'Post',
        'Image & Video',
        'Link',
        'Poll'
      ],
      title: '',
      text: ''
    }
  },
  computed: {
    prefixedCommunities () {
      return this.communities.map(e => ({ ...e, name: `r/${e.name}` }))
    }
  },
  methods: {
    back () {
      if (window.history.length > 2) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    },
    submit () {
      let route, fields

      if (this.tab === 0) {
        route = 'text'
        fields = { text: this.text }
      }

      axios.post(`/api/posts/${route}`, {
        title: this.title,
        communityId: this.communityId,
        ...fields
      })
        .then(res => {
          // todo: redirect to submitted post
          window.location.href = '/'
        })
    }
  }
}
</script>

<style scoped lang='scss'>
  .v-select {
    max-width: 300px;
    margin-top: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .action-buttons {
    display: flex;
    justify-content: flex-end;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-left: 15px;
  }
  .v-textarea, .editr {
    margin-top: -10px;
  }
  .v-textarea {
    margin-bottom: -20px;
  }
</style>
