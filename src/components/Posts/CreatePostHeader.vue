<template>
  <v-card>
    <div class='create-post-container'>
      <v-card-actions>
        <router-link to='/settings'><v-icon large>face</v-icon></router-link>
      </v-card-actions>
      <router-link to='/posts/create' style='flex: 1'>
        <v-text-field
          color='rgba(150, 150, 150, 55)'
          placeholder="Create Post"
          dense
          hide-details
          outlined
          readonly
        ></v-text-field>
      </router-link>
      <v-card-actions>
        <v-icon large>add_photo_alternate</v-icon>
        <v-icon large>link</v-icon>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .create-post-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
    margin-bottom: 20px;
  }
  i {
    cursor: pointer;

    &:nth-of-type(2) {
      margin-left: 10px;
    }
  }
  a {
    text-decoration: none;
  }
  // v-text-field outline
  // .v-application div.primary--text {
  //   color: rgba(150, 150, 150, 55) !important;
  //   caret-color: rgba(150, 150, 150, 55) !important;
  // }
  // fieldset {
  //   border-width: 1px !important;
  //   color: rgba(150, 150, 150, 55) !important;
  // }
</style>
