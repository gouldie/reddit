<template>
  <v-card>
    <div class='create-post-container'>
      <v-card-actions>
        <router-link to='/settings'><v-icon large>face</v-icon></router-link>
      </v-card-actions>
      <v-text-field
        placeholder="Create Post"
        dense
        hide-details
        outlined
      ></v-text-field>
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

<style lang="scss">
  .create-post-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
  }
  i {
    cursor: pointer;

    &:nth-of-type(2) {
      margin-left: 10px;
    }
  }
  // v-text-field outline
  .v-application div.primary--text {
    color: rgba(150, 150, 150, 55) !important;
    caret-color: rgba(150, 150, 150, 55) !important;
  }
  fieldset {
    border-width: 1px !important;
    color: rgba(150, 150, 150, 55) !important;
  }
</style>
