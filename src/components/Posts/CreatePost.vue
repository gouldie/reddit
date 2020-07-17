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

          <div v-if='tab === 0' >
            <TextField :value='text' @onChange='textOnChange' :dense='true' placeholder='Text (optional)' :area='true' />
          </div>

          <v-card-text class='error-text' v-if='error'>{{ error }}</v-card-text>

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
import TextField from '@/components/Core/TextField.vue'

export default {
  props: [
    'communities'
  ],
  components: {
    TextField
  },
  data: function () {
    return {
      communityId: this.$route.params.community ? this.communities.find(e => e.name === this.$route.params.community).id : null,
      tab: 0,
      items: [
        'Post',
        'Image & Video',
        'Link'
      ],
      title: '',
      text: '',
      error: null
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
          if (res.data.success) {
            // todo: redirect to submitted post
            window.location.href = '/'
            return
          }

          this.error = res.data.message
        })
    },
    textOnChange (e) {
      this.text = e
    }
  },
  watch: {
    communityId (id) {
      const name = this.communities.find(e => e.id === id).name
      this.$router.push(`/posts/create/${name}`)
    }
  }
}
</script>

<style scoped lang='scss'>
  .v-select {
    max-width: 300px;
    margin-top: 20px;
    margin-bottom: 15px;
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
  .error-text {
    color: red !important;
  }
  .v-card {
    padding: 0 8px;
  }
  .v-card__actions {
    padding: 8px 0 8px;
  };
</style>
