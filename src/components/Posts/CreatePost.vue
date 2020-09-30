<template>
  <div>
    <h3>Create a post</h3>
    <v-divider />
    <v-select
      :items='prefixedCommunities'
      item-text='name'
      item-value='id'
      label='Choose a community'
      outlined
      dense
      color='grey'
      v-model='communityId'
    ></v-select>
    <v-tabs
      fixed-tabs
      background-color='indigo'
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
    <v-card class='tabs-items-wrapper'>
      <v-tabs-items v-model='tab'>
        <v-tab-item
          v-for='item in items'
          :key='item'
          :reverse-transition='false'
          :transition='false'
        >
          <v-text-field
            class='create-post-title'
            outlined
            dense
            counter='300'
            placeholder='Title'
            v-model='title'
          ></v-text-field>

          <TextField
            v-if='tab === 0'
            :value='text'
            @onChange='textOnChange'
            :dense='true'
            placeholder='Text (optional)'
            :area='true'
          />
          <DropZone
            v-if='tab === 1'
            @addImage='addImage'
          />
          <TextField
            v-if='tab === 2'
            :value='link'
            @onChange='linkOnChange'
            :dense='true'
            placeholder='Url'
            :area='false'
          />

          <v-card-text class='error-text' v-if='error'>{{ error }}</v-card-text>

          <v-card-actions class='action-buttons'>
            <v-btn width='100' @click='back()'>
              Cancel
            </v-btn>
            <v-btn color='primary' width='80' @click='submit' :disabled='disabled'>
              Post
            </v-btn>
          </v-card-actions>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import TextField from '@/components/Core/TextField.vue'
import DropZone from '@/components/Core/DropZone.vue'

export default {
  props: [
    'communities'
  ],
  components: {
    TextField,
    DropZone
  },
  data: function () {
    return {
      communityId: this.$route.params.community ? this.communities.find(e => e.name === this.$route.params.community).id : null,
      tab: this.$route.query.tab ? Number(this.$route.query.tab) : 0,
      items: [
        'Post',
        'Image & Video',
        'Link'
      ],
      title: '',
      text: '',
      image: null,
      link: '',
      error: null
    }
  },
  computed: {
    prefixedCommunities () {
      return this.communities.map(e => ({ ...e, name: `r/${e.name}` }))
    },
    disabled () {
      if (this.tab === 0) {
        return !this.communityId || !this.title
      }

      if (this.tab === 1) {
        return !this.communityId || !this.title || !this.image
      }

      if (this.tab === 2) {
        return !this.communityId || !this.title || !this.link
      }

      return false
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

      if (this.tab === 1) {
        route = 'image'
        fields = { image: this.image }
      }

      if (this.tab === 2) {
        route = 'link'
        fields = { link: this.link }
      }

      axios.post(`/api/posts/${route}`, {
        title: this.title,
        communityId: this.communityId,
        ...fields
      })
        .then(res => {
          if (res.data.success) {
            // todo: redirect to submitted post
            window.location.href = `/post/${res.data.id}`
            return
          }

          this.error = res.data.message
        })
    },
    textOnChange (e) {
      this.text = e
    },
    addImage (image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)

      reader.onload = (event) => {
        this.image = event.target.result
      }
    },
    linkOnChange (e) {
      this.link = e
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
  @import '~vuetify/src/styles/styles.sass';
  .v-tabs {
    border-radius: 3px;
  }
  .v-select {
    max-width: 300px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .create-post-title {
    margin-bottom: 10px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .action-buttons {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: 15px !important;
    }
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  .error-text {
    color: red !important;
    padding-left: 0;
  }
  .v-card {
    padding: 8px 16px;
  }
  .v-card__actions {
    padding: 8px 0 8px;
  }
  @media #{map-get($display-breakpoints, 'xs-only')} {
    .v-tab {
      font-size: 12px;
    }
  }
</style>
