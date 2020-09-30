<template>
  <v-tooltip bottom open-delay='400'>
    <span>{{ label || 'Icon' }}</span>
    <template v-slot:activator='{ on, attrs }'>
      <v-icon v-bind='attrs' v-on='on' large>{{ icon }}</v-icon>
    </template>
  </v-tooltip>
</template>

<script>
export default {
  props: [
    'label',
    'icon'
  ]
}
</script>
