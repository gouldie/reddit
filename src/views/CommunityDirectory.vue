<template>
  <div>
    <div class='header'>
      <v-container>
        asd
      </v-container>
    </div>
    <v-container>
      <v-card>
        <v-card-title>
          Browse Communities starting with {{ letter }}
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import communities from '@/assets/json/communities.json'

export default {
  name: 'CommunityDirectory',
  data: function () {
    return {
      letter: (this.$route.params.letter && this.$route.params.letter.toUpperCase()) || 'A',
      communities
    }
  }
}
</script>
