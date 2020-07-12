<template>
  <div class='community-header'>
    <div v-if='border' class='border'></div>
    <div class='main'>
      <v-container>
        <slot></slot>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'border'
  ]
}
</script>

<style lang="scss" scoped>
  .community-header {
    .border {
      height: 80px;
      background: #33a8ff;
    }
    .main {
      background: white;
    }
    .container {
      height: 80px;
      display: flex;
      align-items: center;
      padding-top: 0;
      padding-bottom: 0;
      .icon {
        width: 70px;
        height: 70px;
        background: maroon;
        border-radius: 50%;
        margin-right: 20px;
      }
      p {
        margin: 0;
      }
      span {
        color: rgb(0, 121, 211);
        margin-right: 2px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
