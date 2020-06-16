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
      v-model='subreddit'
    ></v-select>
    <v-tabs
      fixed-tabs
      background-color="indigo"
      dark
      v-model='tab'
    >
      <v-tab
        v-for='item in items'
        :key='item'
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model='tab'>
      <v-tab-item
        v-for='item in items'
        :key='item'
        :reverse-transition='false'
        :transition='false'
      >
        <v-card flat tile>
          <v-card-actions>
            <v-text-field
              outlined
              dense
              counter='300'
              placeholder='Title'
            >
            </v-text-field>
          </v-card-actions>

          <v-card-actions>
            {{ item }}
          </v-card-actions>

          <v-card-actions class='action-buttons'>
            <v-btn>
              Cancel
            </v-btn>
            <v-btn color='primary'>
              Post
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  props: [
    'subreddits'
  ],
  data: function () {
    return {
      subreddit: null,
      tab: 0,
      items: [
        'Post',
        'Image & Video',
        'Link',
        'Poll'
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
  .v-select {
    max-width: 300px;
    margin-top: 20px;
  }
  h3 {
    margin-bottom: 10px;
  }
  .action-buttons {
    display: flex;
    justify-content: flex-end;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  button {
    margin-left: 15px;
  }
</style>
