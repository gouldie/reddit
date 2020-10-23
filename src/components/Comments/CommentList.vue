<template>
  <div class='comments-list'>
    <div class='sortby'>
      <div class='select-container'>
        <span class='label'>
          SORT BY
        </span>
        <v-select
          v-model='select'
          :items='items'
          item-text='filter'
          item-value='value'
          label='Select'
          return-object
          class='borderless'
          single-line
          hide-details
          dense
          solo
          :menu-props='{ bottom: true, offsetY: true }'
          @change='onSort'
        ></v-select>
      </div>
      <hr />
    </div>
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
  data: function () {
    return {
      select: { filter: 'TOP (SUGGESTED)', value: 'Top' },
      items: [
        { filter: 'TOP (SUGGESTED)', value: 'Top' },
        { filter: 'BEST', value: 'Best' },
        { filter: 'HOT', value: 'Hot' },
        { filter: 'NEW', value: 'New' }
      ]
    }
  },
  methods: {
    onSort (e) {
      this.$emit('sort', e.value)
    }
  },
  mounted () {
    if (this.$route.query.scroll === 'comments') {
      document.querySelector('.comments-list').scrollIntoView()
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~vuetify/src/styles/styles.sass';
  .comments-list {
    padding: 0 34px 10px 0;
  }
  .comments-list-enter-active, .comments-list-leave-active {
    transition: all 0.7s;
  }
  .comments-list-enter, .comments-list-leave-to {
    opacity: 0;
  }
  .sortby {
    padding: 0 16px 0 52px; // 52px here looks better to the eye
    letter-spacing: .5px;
    color: #7c7c7c;
    font-weight: 700;

    .select-container {
      display: flex;
      align-items: center;
    }

    .v-input {
      max-width: 170px;
      font-size: 12px;
    }

    .label {
      font-size: 10px;
    }
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .comments-list {
      padding: 0 10px 10px 0;
    }
    .sortby {
      padding: 0 0 0 12px;
    }
  }
</style>
