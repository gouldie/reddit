<template>
  <div>
    <h3>Create a post</h3>
    <v-divider />
    <v-select
      :items="subreddits"
      label="Choose a community"
      outlined
      dense
      color='grey'
    ></v-select>
  </div>
</template>

<script>
export default {
  props: [
    'subreddits'
  ]
}
</script>

<style scoped>
  .v-select {
    max-width: 300px;
    margin-top: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
</style>
