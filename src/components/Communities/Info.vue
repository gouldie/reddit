<template>
  <v-card>
    <div class='black-gradient'>

    </div>
    <v-card>
      <v-card-title>{{ prefixedCommunityName }}</v-card-title>
      <v-card-text>{{ community.description }}</v-card-text>
      <div class='activity-container'>
        <div>
          <span>2.1m</span>
          <span>Members</span>
        </div>
        <div>
          <span>2.2k</span>
          <span>Online</span>
        </div>
      </div>
      <v-divider />
      <v-card-text>Created 14 April 2008</v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  props: [
    'community'
  ],
  data: function () {
    return {

    }
  },
  computed: {
    prefixedCommunityName () {
      return this.community && `r/${this.community.name}`
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
  }
  .v-card__text {
    border-bottom: 1px solid #cccccc;
  }
  .activity-container {
    display: flex;
    padding: 16px;
    >div {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    span {
      &:nth-of-type(1) {
        font-weight: 500;
      }
      &:nth-of-type(2) {
        font-size: 12px;
      }
    }
  }
</style>
