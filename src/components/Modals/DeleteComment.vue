<template>
  <div class='text-center'>
    <v-dialog
      v-model='dialog'
      width='500'
    >
      <v-card>
        <v-card-title class='modal-title headline grey lighten-2' primary-title>
          Delete comment
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this comment?
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
    'commentId',
    'rootId'
  ],
  methods: {
    submit () {
      const request = this.rootId === this.commentId
        ? axios.post('/api/comments/delete', {
          commentId: this.commentId
        })
        : axios.post('/api/comments/reply/delete', {
          commentId: this.commentId,
          rootId: this.rootId
        })

      request
        .then(res => {
          this.$emit('closeModal')
          if (res.data.comment) {
            this.$emit('updateComment', res.data.comment)
          } else {
            this.$emit('deleteComment', this.rootId)
          }
          this.$store.commit('setModal', null)
        })
    }
  },
  computed: {
    dialog: {
      get () {
        return this.$store.state.modal === 'delete-comment'
      },
      set () {
        this.$emit('closeModal')
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
