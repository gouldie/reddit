<template>
  <v-card>
    <div class='black-gradient'>

    </div>
    <v-card>
      <v-card-title>Posting to reddit</v-card-title>
      <v-card-text v-for='(rule, i) in rules' :key='rule'>
        {{ i+1 }}. {{ rule }}
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {
      rules: [
        'Remember the human',
        'Behave like you would in real life',
        'Look for the original source of content',
        'Search for duplicates before posting',
        'Read the community\'s rules'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .black-gradient {
    height: 35px;
  }
  .v-card__title {
    font-size: 18px;
    padding-bottom: 10px;
  }
  .v-card__text {
    padding: 10px 10px 10px 20px;
    border-bottom: 1px solid #cccccc;
  }
</style>
