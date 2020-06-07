<template>
  <div class="home">
    <h1>This is a home page</h1>
    <router-link to='/about'>Go to about</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>
