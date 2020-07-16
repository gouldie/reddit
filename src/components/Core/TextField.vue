<template>
  <div>
    <v-text-field
      v-if='!area'
      outlined
      dense
      :value='value'
      @change='onChange'
      :placeholder='placeholder || "What are your thoughts?"'
    >
    </v-text-field>
    <v-textarea
      v-if='area'
      outlined
      dense
      :value='value'
      @change='onChange'
      :placeholder='placeholder || "What are your thoughts?"'
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'dense',
    'placeholder',
    'area'
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
