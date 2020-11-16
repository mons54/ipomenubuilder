<template>
  <div id="menu">
    <div :style="stylePage">
      <div :style="styleLayout">
        <div
          v-for="(area, ai) of areas"
          v-on:click="e => {
            e.stopPropagation()
            $store.dispatch('selectArea', area)
          }"
          :key="ai"
          :style="styleArea(area, ai)"
          class="area">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAreas } from '@/helpers/grid'

export default {
  computed: {
    ...mapGetters('menu', [
      'page',
    ]),
    grid () {
      return this.page.grid
    },
    areas () {
      const areas = getAreas(this.grid.gridTemplateAreas)
      areas.sort((a, b) => {
        if (b === 'main')
          return -1
        if (a === 'main')
          return
        if (a === 'title')
          return -1
        if (b === 'title')
          return
        return b > a ? -1 : 1
      })
      return areas
    },
    stylePage () {
      return {
        padding: '11.338582677165356px',
        background: '#607D8B',
        width: `793.7007874015749px`,
        height: `1122.5196850393702px`,
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        lineHeight: 0,
      }
    },
    styleLayout () {
      return {
        ...this.grid,
        display: 'grid',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }
    },
  },
  methods: {
    styleArea (name, index) {
      return {
        position: 'relative',
        backgroundColor: this.page.colors[index],
        gridArea: name,
        overflow: 'hidden',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#menu {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
