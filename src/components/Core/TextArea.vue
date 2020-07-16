<template>
  <div>
    <v-textarea
      outlined
      :value='value'
      @change='onChange'
      :label='placeholder || "What are your thoughts?"'
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'dense',
    'placeholder'
  ],
  methods: {
    onChange (e) {
      this.$emit('onChange', e)
    }
  }
}
</script>

<style lang="scss">
  .v-input {
    label {
      font-size: 0.875rem !important;
    }
    font-size: 0.875rem;
    textarea {
      line-height: 1.4rem;
    }
  }
  .v-text-field__details {
    display: none;
  }
</style>
