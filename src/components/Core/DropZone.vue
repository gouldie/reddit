<template>
  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added='addImage' ></vue-dropzone>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  props: [
    'initialImage'
  ],
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 1,
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
      if (!image.status) return
      this.$emit('addImage', image)
    }
  },
  mounted () {
    if (this.initialImage) {
      const mime = this.initialImage.substring(this.initialImage.indexOf(':') + 1, this.initialImage.indexOf(';'))
      const extension = mime.split('/')[1]
      const file = { name: `filename.${extension}`, type: mime, dataURL: this.initialImage }

      this.$refs.myVueDropzone.manuallyAddFile(file, this.initialImage)
      this.$refs.myVueDropzone.dropzone.emit('thumbnail', file, file.dataURL)
      this.$refs.myVueDropzone.dropzone.emit('complete', file)
    }
  }
}
</script>

<style lang="scss">
  .dz-preview, .dz-image {
    width: 100%;
    margin: 0 !important;
  }
  .vue-dropzone img {
    margin: 0 auto;
    max-width: 100%;
    max-height: 300px;
  }
  .dz-details {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }
  .dz-size, .dz-filename, .dz-progress {
    display: none;
  }
</style>
