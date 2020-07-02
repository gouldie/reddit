<template>
  <div class='comments-list'>
    <Comment v-for='comment in comments' :key='comment.id' :comment='comment' />
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
  }
}
</script>

<style scoped lang="scss">

</style>
