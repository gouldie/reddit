<template>
  <div class='text-center'>
    <v-dialog
      v-model='dialog'
      width='500'
    >
      <v-card>
        <v-card-title class='modal-title headline grey lighten-2' primary-title>
          Delete post
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this post?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='green' text @click='dialog = false'>
            Cancel
          </v-btn>
          <v-btn color='red' text @click='submit'>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: [
    'postId'
  ],
  methods: {
    submit () {
      axios.post('/api/posts/delete', {
        postId: this.postId
      })
        .then(res => {
          window.location.href = '/'
        })
    }
  },
  computed: {
    dialog: {
      get () {
        return this.$store.state.modal === 'delete-post'
      },
      set () {
        this.$store.commit('setModal', null)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .v-card__text {
    padding: 20px 24px !important;
  }
  .log-in-button {
    margin-right: 20px;
    color: black !important;
  }
</style>
