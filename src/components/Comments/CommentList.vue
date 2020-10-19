<template>
  <div class='comments-list'>
    <transition-group name='comments-list' tag='div'>
      <Comment
        v-for='comment in comments'
        :key='comment._id'
        :comment='comment'
        :rootId='comment._id'
        v-on='$listeners'
      />
    </transition-group>
  </div>
</template>

<script>
import Comment from '@/components/Comments/Comment.vue'

export default {
  props: [
    'comments'
  ],
  components: {
    Comment
  },
  mounted () {
    if (this.$route.query.scroll === 'comments') {
      document.querySelector('.comments-list').scrollIntoView()
    }
  }
}
</script>

<style scoped lang="scss">
  .comments-list {
    padding-bottom: 10px;
  }
  .comments-list-enter-active, .comments-list-leave-active {
    transition: all 0.7s;
  }
  .comments-list-enter, .comments-list-leave-to {
    opacity: 0;
  }
</style>
