<template>
  <div>
    <v-text-field
      v-if='!area'
      outlined
      dense
      :value='value'
      @input='onChange'
      :placeholder='placeholder || "What are your thoughts?"'
    >
    </v-text-field>
    <v-textarea
      v-if='area'
      outlined
      dense
      :value='value'
      @input='onChange'
      auto-grow
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

<style scoped lang="scss">
  @import '~vuetify/src/styles/styles.sass';

  .v-input {
    textarea {
      line-height: 22px !important;
    }
  }
  .v-text-field__details {
    display: none;
  }
</style>
