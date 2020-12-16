<template>
  <div class="style-image">
    <div class="filters">
      <div
        v-for="(value, index) in filters"
        v-on:click="filter = value"
        :key="index"
        class="filter">
        <img
          :style="`filter: ${value}`"
          :src="element.image.previewURL"/>
        <b-icon-check
          v-if="value === filter"
          class="active"/>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    element: Object,
  },
  data () {
    return {
      filters: [
        'hue-rotate(45deg)',
        'saturate(0.5)',
        'brightness(0.5)',
        'sepia(1)',
        'grayscale(1)',
        'invert(1)',
        'blur(1px)',
        'contrast(0.5)',
        'opacity(0.5)',
      ],
    }
  },
  computed: {
    style() {
      return this.element.style
    },
    filter: {
      get () {
        return this.style.filter
      },
      set (value) {
        if (this.filter === value)
          Vue.delete(this.style, 'filter')
        else
          Vue.set(this.style, 'filter', value)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4px;
  row-gap: 4px;
  .filter {
    position: relative;
    display: flex;
    overflow: hidden;
    cursor: pointer;
    .active {
      position: absolute;
      left: 0;
      top: 0;
      margin: 8px;
      background-color: #263238;
      border-radius: 50%;
      color: #fff;
    }
  }
}
</style>
