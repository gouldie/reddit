<template>
  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added='addImage'></vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
        uploadMultiple: false,
        maxFiles: 1,
        addRemoveLinks: true,
        acceptedFiles: ['image/*']
      }
    }
  },
  methods: {
    addImage (image) {
      this.$emit('addImage', image)
    }
  }
}
</script>

<style lang="scss">
  .dz-preview, .dz-image {
    width: 100%;
  }
  img {
    margin: 0 auto;
  }
</style>
