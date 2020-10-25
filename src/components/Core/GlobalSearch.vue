<template>
 <v-autocomplete
    dense
    label='Search'
    solo
    flat
    hide-details
    hide-no-data
    prepend-inner-icon='search'
    :items='communities'
    item-text='name'
    item-value='name'
    :menu-props='{ maxHeight: 38 * 5, closeOnContentClick: true }'
    @change='select'
  >
    <template v-slot:item='data'>
      <div class='menuitem'>
        <v-list-item-avatar size='20'>
          <img :src='src(data.item.name)'>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title html='data.item.name'>{{ data.item.name }}</v-list-item-title>
          <v-list-item-subtitle html='data.item.group'>{{ data.item.members }} members</v-list-item-subtitle>
        </v-list-item-content>
      </div>
    </template>
  </v-autocomplete>
</template>

<script>
import communities from '@/assets/json/communities.json'

export default {
  data: function () {
    return {
      communities
    }
  },
  computed: {
    communityNames () {
      return communities.map(e => e.name)
    }
  },
  methods: {
    select (name) {
      this.$router.push(`/r/${name}`).catch(err => {
        // Ignore the err regarding navigating to the page they are already on
        if (err.name !== 'NavigationDuplicated' && !err.message.includes('Avoided redundant navigation to current location')) {
          console.error(err)
        }
      })
      document.querySelector('.v-autocomplete input').blur() // unfocus the autocomplete element
    },
    src (name) {
      let img

      try {
        img = require(`@/assets/images/community/${name}.png`)
      } catch (e) {
        img = require('@/assets/images/community/default.png')
      }
      return img
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';

  .v-list-item__subtitle {
    font-size: 11px !important;
  }

  .menuitem {
    display: flex;
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    .v-input {
      max-width: 200px;
      position: relative;
      top: 4px;
    }
  }
</style>
