<template>
  <div class='post-actions-container'>
    <div v-for='action in actions' :key='action' @click='onClick(action)' @click.prevent>
      <v-icon small>
        {{ icons[action] }}
      </v-icon>
      <span>{{ actionText(action) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'showEditDelete',
    'commentCount',
    'onClickComments'
  ],
  data: function () {
    return {
      icons: {
        Comments: 'chat_bubble',
        Share: 'share',
        Edit: 'edit',
        Delete: 'delete'
      }
    }
  },
  computed: {
    actions () {
      if (this.showEditDelete) {
        return ['Comments', 'Share', 'Edit', 'Delete']
      }

      return ['Comments', 'Share']
    }
  },
  methods: {
    actionText (action) {
      if (action === 'Comments') {
        return `${this.commentCount} ${this.commentCount === 1 ? 'Comment' : 'Comments'}`
      }

      return action
    },
    onClick (action) {
      this.$emit('onClick', action)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post-actions-container {
    display: flex;
    padding: 0 16px 8px 12px;

    >div {
      margin-right: 4px;
      color: rgb(135, 138, 140);
      padding: 4px;
      border-radius: 2px;
      cursor: pointer;

      i {
        margin-right: 5px;
      }

      span {
        font-weight: bold;
      }

      &:hover {
        background: #ebebeb;
      }
    }
  }
</style>
