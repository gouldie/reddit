<template>
  <div>
    <v-text-field
      v-if='!area'
      outlined
      dense
      :value='value'
      @input='onChange'
      :placeholder='placeholder || "What are your thoughts?"'
      hide-details
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
