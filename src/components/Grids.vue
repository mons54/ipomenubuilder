<template>
  <div class="grids">
    <div
      v-for="(value, index) of grids"
      @click="grid = value"
      :key="index"
      :style="value"
      :class="{'active': isActive(value)}"
      class="grid">
      <div
        v-for="(area, index) in getAreas(value.gridTemplateAreas)"
        :key="index"
        :style="{gridArea: area}"
        class="grid-area">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { grids, getAreas } from '@/helpers/grid'

export default {
  data() {
    return {
      grids,
    }
  },
  computed: {
    ...mapGetters('menu', [
      'area',
    ]),
    grid: {
      get() {
        return this.area.grid
      },
      set(grid) {
        this.area.grid = grid
      }
    },
  },
  methods: {
    getAreas,
    isActive(grid) {
      return JSON.stringify(grid) === JSON.stringify(this.grid)
    }
  },
}
</script>

<style lang="scss" scoped>
.grids {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 16px;
  .grid {
    display: grid;
    cursor: pointer;
    background-color: #4f5d64;
    height: 120px;
    overflow: hidden;
    row-gap: 4px;
    column-gap: 4px;
    padding: 4px;
    &.active {
      outline: 1px solid #8fcaf9;
    }
    .grid-area {
      display: flex;
      align-items: center;
      justify-content: center;
      display: inline-grid;
      background-color: #263238;
    }
  }
}
</style>
