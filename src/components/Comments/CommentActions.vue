<template>
  <div class='comment-actions-container'>
    <div :class='{
        "comment-action": true,
        "selected": action === "Edit" && showSave
      }' v-for='action in actions' :key='action' @click='onClick(action)' @click.prevent>
      <v-icon small>
        {{ icons[action] }}
      </v-icon>
      <span>{{ action }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'showEditDelete',
    'showSave'
  ],
  data: function () {
    return {
      icons: {
        Reply: 'chat_bubble',
        Share: 'share',
        Edit: 'edit',
        Delete: 'delete',
        Save: 'save'
      }
    }
  },
  computed: {
    actions () {
      let actions = ['Reply']

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
    onClick (action) {
      this.$emit('onClick', action)
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment-actions-container {
    display: flex;
    flex-wrap: wrap;
    padding: 0 16px 8px 12px;

    .comment-action {
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
