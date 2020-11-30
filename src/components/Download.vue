<template>
  <b-nav-item-dropdown text="Télécharger" right>
    <b-dropdown-item
      v-for="(value, key) in types"
      :key="key">
      {{ value }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  data () {
    return {
      type: 'PDF',
      mark: true,
      types: ['PDF', 'PNG', 'JPEG'],
      scale: 1,
      maxScaleSlider: 2,
    }
  },
}
</script>

<style lang="css" scoped>
</style>
