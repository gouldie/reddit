<template>
  <div :class='`textarea-container ${dense && "dense"} ${!$vuetify.breakpoint.smAndUp && "responsive"}`'>
    <wysiwyg
      v-if='$vuetify.breakpoint.smAndUp'
      :html="value"
      @change='onChange'
      style='margin-top: -10px;'
      :placeholder='placeholder || "What are your thoughts?"'
    />
    <v-textarea
      v-if='!$vuetify.breakpoint.smAndUp'
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
  .textarea-container {
    padding: 0 30px 20px;

    &.dense {
      padding: 0 10px 10px;
    }

    &.responsive {
      padding: 0 10px 10px;
    }
  }
  .v-input, .editr--content {
    label {
      font-size: 0.875rem !important;
    }
    font-size: 0.875rem;
    textarea {
      line-height: 1.4rem;
    }
  }
</style>
