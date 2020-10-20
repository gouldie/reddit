<template>
  <v-tooltip top open-delay='400'>
    <template v-slot:activator='{ on, attrs }'>
      <span :role='null' v-bind='attrs' v-on='on'>
        <TimeAgo :datetime='datetime' />
      </span>
    </template>
    <span>{{ new Date(datetime).toLocaleString() }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'CustomTimeAgo',
  props: [
    'datetime'
  ]
}
</script>
