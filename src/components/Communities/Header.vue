<template>
  <div class='community-header'>
    <div></div>
    <div>
      <v-container>
        <div>

        </div>
        <div>
          <h2>{{ community.title }}</h2>
          <p>r/{{ community.name }}</p>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'community'
  ]
}
</script>

<style lang="scss" scoped>
  .community-header {
    >div:nth-of-type(1) {
      height: 80px;
      background: #33a8ff;
    }
    >div:nth-of-type(2) {
      background: white;
    }
    .container {
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0;
      >div:nth-of-type(1) {
        width: 70px;
        height: 70px;
        background: maroon;
        border-radius: 50%;
        margin-right: 20px;
      }
      p {
        margin: 0;
      }
    }
  }
</style>
