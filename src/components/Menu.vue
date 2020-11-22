<template>
  <div id="menuContainer">
    <div id="menu">
      <div
        id="menuContent"
        :style="styleMenuContent">
        <div
          id="pageContainer"
          :style="stylePageContainer">
          <div
            id="page"
            :style="stylePage">
            <div
              v-for="(area, ai) of areas"
              :key="ai"
              :style="styleArea(area)"
              class="area">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
//import { getAreas } from '@/helpers/grid'

export default {
  data () {
    return {
      spacing: 40,
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
      format: state => state.menu.data.format,
      scale: state => state.menu.scale,
    }),
    ...mapGetters('menu', [
      'page',
    ]),
    areas () {
      return this.page.areas
    },
    bleed () {
      return this.format.bleed
    },
    safeZone () {
      return this.format.safeZone
    },
    width () {
      return this.format.width + this.bleed * 2
    },
    height () {
      return this.format.height + this.bleed * 2
    },
    fullWidth () {
      return this.width + this.spacing * 2
    },
    fullHeight () {
      return this.height + this.spacing * 2
    },
    styleMenuContent () {
      return {
        width: `${this.fullWidth * this.scale}px`,
        height: `${this.fullHeight * this.scale}px`,
      }
    },
    stylePageContainer () {
      return {
        width: `${this.fullWidth}px`,
        height: `${this.fullHeight}px`,
        transform: `scale(${this.scale})`,
        padding: `${this.spacing}px`,
      }
    },
    stylePage () {
      return {
        padding: `${this.bleed}px`,
        background: '#607D8B',
        width: `${this.width}px`,
        height: `${this.height}px`,
        position: 'relative',
        overflow: 'hidden',
      }
    },
    /**areas () {
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
    },*/
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
    styleArea(area) {
      return {
        width: `${area.width}px`
      }
    },
    /*styleArea (name, index) {
      return {
        position: 'relative',
        backgroundColor: this.page.colors[index],
        gridArea: name,
        overflow: 'hidden',
      }
    },*/
  },
}
</script>

<style lang="scss" scoped>
#menuContainer {
  width: 100%;
  height: 100%;
  touch-action: manipulation;
  user-select: none;
  overflow: auto;
  #menu {
    display: flex;
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
    overflow: auto;
    #menuContent {
      margin: auto;
      #pageContainer {
        position: relative;
        transform-origin: top left;
        #page {
          display: flex;
          width: 100%;
          height: 100%;
          .area {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
