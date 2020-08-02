<template>
  <v-card>
    <v-card-title>Browse Communities A-Z</v-card-title>
    <div class='az-container'>
      <span v-for='letter in letters' :key='letter' @click='$router.push(`/communities/directory/${letter === "#" ? "no" : letter}`)'>
        {{ letter }}
      </span>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-card {
    min-height: auto !important;
  }
  span {
    color: var(--v-info-darken1);
    cursor: pointer;
    font-size: 14px;
  }
  .v-card__title {
    font-size: 16px;
    padding-bottom: 10px;
  }
  .az-container {
    padding: 0 16px 16px;
  }
</style>
