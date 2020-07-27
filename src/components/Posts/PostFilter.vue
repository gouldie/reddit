<template>
  <v-card>
    <div class='post-sort-container'>
      <v-card-actions>
        <div :key='item' v-for='item in Object.keys(sorts)' :class='sort === item && "selected"' @click='selectSort(item)'>
          <v-icon dense>{{ sorts[item] }}</v-icon>
          <v-card-text>{{ item }}</v-card-text>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  props: [
    'sort'
  ],
  data: function () {
    return {
      sorts: {
        Best: 'keyboard_arrow_up',
        Hot: 'fireplace',
        New: 'fiber_new',
        Top: 'stars'
      }
    }
  },
  methods: {
    selectSort (sort) {
      this.$emit('selectSort', sort)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '~vuetify/src/styles/styles.sass';

  .post-sort-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 0;
    margin-bottom: 20px;
  }
  .v-card__actions {
    >div {
      margin-right: 15px;
      display: flex;
      padding: 3px 9px 3px 6px;
      border-radius: 10px;
      cursor: pointer;
    }
    .selected {
      background-color: #dcdcdc;
    }
  }
  i {
    margin-right: 3px;
  }
  .v-card__text {
    padding: 0;
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .v-card__actions {
      >div {
        margin-right: 5px;
      }
    }
  }
</style>
