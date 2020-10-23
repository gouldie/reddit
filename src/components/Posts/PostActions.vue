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
      @click='(e) => onClick(e, action)'
      @click.prevent
    >
      <v-icon small>
        {{ icons[action] }}
      </v-icon>
      <span>{{ actionText(action) }}</span>
    </div>

     <v-menu
      v-model='showShareMenu'
      :position-x='x'
      :position-y='y'
      absolute
      offset-y
    >
      <v-list>
        <v-list-item @click='copyURL'>
          <v-icon small>
            link
          </v-icon>
          <v-list-item-title>Copy Link</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-snackbar
      v-model='snackbar'
      :timeout='2000'
      rounded='pill'
    >
      <v-icon small>
        done_all
      </v-icon>
      <span style='margin-left: 10px;'>Copied link!</span>
      <template v-slot:action='{ attrs }'>
        <v-btn
          color='pink'
          text
          v-bind='attrs'
          @click='snackbar = false'
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import VotePanel from '@/components/Posts/VotePanel'
import { textToClipboard } from '@/utils.js'

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
      },
      showShareMenu: false,
      x: 0,
      y: 0,
      snackbar: false
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
    show (e) {
      e.preventDefault()
      this.showShareMenu = true
      this.x = e.clientX
      this.y = e.clientY
      // this.$nextTick(() => {
      //   this.showShareMenu = true
      // })
    },
    actionText (action) {
      if (action === 'Comments') {
        return `${this.commentCount} ${this.commentCount === 1 ? 'Comment' : 'Comments'}`
      }

      return action
    },
    onClick (e, action) {
      if (action === 'Share') {
        if (!this.showShareMenu) { this.show(e) }
        return
      }
      this.$emit('onClick', action)
    },
    copyURL () {
      const url = `${window.location.origin}/r/${this.post.communityName}/${this.post._id}`
      textToClipboard(url)
      this.snackbar = true
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
