<template>
  <div class="font-size">
    <b-form-input
      v-model="search"
      type="search"
      size="sm"
      autocomplete="off"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      min: 6,
      sizes: [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96, 104, 120],
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
