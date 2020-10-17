<template>
  <div class='post-actions-container'>
    <VotePanel :mobile='true' :post='post' v-on='$listeners' />
    <div
      :class='{
        "post-action": true,
        "selected": action === "Edit" && showSave
      }'
      v-for='action in actions'
      :key='action'
      @click='onClick(action)'
      @click.prevent
    >
      <v-icon small>
        {{ icons[action] }}
      </v-icon>
      <span>{{ actionText(action) }}</span>
    </div>
  </div>
</template>

<script>
import VotePanel from '@/components/Posts/VotePanel'

export default {
  props: [
    'showEditDelete',
    'showSave',
    'commentCount',
    'onClickComments',
    'post'
  ],
  components: {
    VotePanel
  },
  data: function () {
    return {
      icons: {
        Comments: 'chat_bubble',
        Share: 'share',
        Edit: 'edit',
        Delete: 'delete',
        Save: 'save'
      }
    }
  },
  computed: {
    actions () {
      let actions = ['Comments', 'Share']

      if (this.showEditDelete) {
        actions = actions.concat(['Edit', 'Delete'])
      }

      if (this.showSave) {
        actions = actions.concat(['Save'])
      }

      return actions
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
    flex-wrap: wrap;
    padding: 0 16px 8px 12px;

    .post-action {
      margin-right: 2px;
      color: rgb(135, 138, 140);
      padding: 2px 6px;
      border-radius: 2px;
      cursor: pointer;

      i {
        margin-right: 5px;
      }

      span {
        font-weight: bold;
        font-size: 12px;
      }

      &:hover {
        background: #ebebeb;
      }
      &.selected {
        background: #ebebeb;
      }
    }
  }
</style>
