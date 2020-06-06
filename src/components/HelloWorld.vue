<template>
  <div>
    <button @click='test'>test</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    test: () => {
      console.log('test')
      axios.get('/api')
        .then(res => {
          console.log('done')
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
