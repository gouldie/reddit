<template>
  <v-card>
    <div class='ph-item'>
      <div class='ph-col-12'>
        <div class='ph-row'>
          <div class='ph-avatar' />
          <div class='ph-col-8' style='flex-grow: 1; margin-top: 5px;'>
            <div class='ph-row'>
              <div class='ph-col-12' />
              <div class='ph-col-6' />
            </div>
          </div>

          <div class='ph-col-12 empty' />

          <div class='ph-col-12' />
          <div class='ph-col-12'/>
          <div class='ph-col-10' />

          <div v-if='large' class='ph-col-12 empty' />

          <div v-if='large' class='ph-col-12'/>
          <div v-if='large' class='ph-col-8'/>

          <div v-if='large' class='ph-col-12 empty' />

          <div v-if='large' class='ph-col-12'/>
          <div v-if='large' class='ph-col-10' />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: [
    'large'
  ]
}
</script>

<style lang='scss' scoped>
  .v-card {
    background: white;
    margin-bottom: 20px;
  }

  .ph-item {
    margin-bottom: 0;
    padding: 20px 5px 5px;
  }

  .ph-avatar {
    width: 6%;
    min-width: 40px;
    height: inherit;
    margin-right: 30px;
    flex: 0 0 8%;
  }

  .empty {
    background-color: white !important;
  }
</style>
