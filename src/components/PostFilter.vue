<template>
  <v-card>
    <div class='post-filter-container'>
      <v-card-actions>
        <div :key='item' v-for='item in Object.keys(filters)' :class='filter === item && "selected"' @click='selectFilter(item)'>
          <v-icon dense>{{ filters[item] }}</v-icon>{{ item }}
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {
  props: [
    'filter'
  ],
  data: function () {
    return {
      filters: {
        Best: 'keyboard_arrow_up',
        Hot: 'fireplace',
        New: 'fiber_new',
        Top: 'stars'
      }
    }
  },
  methods: {
    selectFilter (filter) {
      this.$emit('selectFilter', filter)
    }
  },
  mounted () {
    console.log(this.filter)
  }
}
</script>

<style scoped lang="scss">
  .post-filter-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3px 0;
    margin: 20px 0;
  }
  .v-card__actions {
    >div {
      margin-right: 15px;
      display: flex;
      padding: 3px 6px 3px 3px;
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
</style>
