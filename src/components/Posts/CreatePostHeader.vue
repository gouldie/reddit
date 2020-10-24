<template>
  <v-card>
    <div class='create-post-container' data-testid='create-post-container'>
      <v-card-actions>
        <router-link to='/settings'>
          <Icon label='User Settings' icon='face' />
        </router-link>
      </v-card-actions>
      <router-link :to='`/posts/create/${community || ""}`' style='flex: 1'>
        <v-text-field
          color='rgba(150, 150, 150, 55)'
          placeholder='Create Post'
          dense
          hide-details
          outlined
          readonly
        ></v-text-field>
      </router-link>
      <v-card-actions>

        <router-link :to='`/posts/create/${community || ""}?tab=1`'>
          <Icon label='Create Media Post' icon='add_photo_alternate' />
        </router-link>

        <router-link :to='`/posts/create/${community || ""}?tab=2`'>
          <Icon label='Create Link Post' icon='link' />
        </router-link>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import Icon from '@/components/Core/Icon.vue'
export default {
  props: [
    'community'
  ],
  components: {
    Icon
  }
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
  .v-input {
    background: #f6f7f8;
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
