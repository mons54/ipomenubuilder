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
              <div
                :style="styleGrid(area.grid)"
                class="grid">
                <div
                  v-for="(gridName, gai) of gridAreas(area.grid)"
                  :key="gai"
                  :style="styleGridArea(area, gridName, gai)"
                  class="grid-area">
                </div>
              </div>
              <div
                v-if="ai + 1 !== areas.length"
                class="bleed bleed--area"
              />
            </div>
          </div>
          <div id="bleed">
            <div
              class="bleed bleed--top"
              :style="styleBleedTop"
            />
            <div
              class="bleed bleed--right"
              :style="styleBleedRight"
            />
            <div
              class="bleed bleed--bottom"
              :style="styleBleedBottom"
            />
            <div
              class="bleed bleed--left"
              :style="styleBleedLeft"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { getAreas } from '@/helpers/grid'

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
    bleedPosition () {
      return this.bleed + this.spacing
    },
    bleedSpacing () {
      return this.spacing - this.bleed * 2
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
    styleBleedTop () {
      return {
        top: `${this.bleedPosition}px`,
        left: `${this.bleedSpacing}px`,
        right: `${this.bleedSpacing}px`,
      }
    },
    styleBleedRight () {
      return {
        right: `${this.bleedPosition}px`,
        top: `${this.bleedSpacing}px`,
        bottom: `${this.bleedSpacing}px`,
      }
    },
    styleBleedBottom () {
      return {
        bottom: `${this.bleedPosition}px`,
        left: `${this.bleedSpacing}px`,
        right: `${this.bleedSpacing}px`,
      }
    },
    styleBleedLeft () {
      return {
        left: `${this.bleedPosition}px`,
        top: `${this.bleedSpacing}px`,
        bottom: `${this.bleedSpacing}px`,
      }
    },
  },
  methods: {
    styleGrid (grid) {
      return {
        ...grid,
        display: 'grid',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }
    },
    gridAreas (grid) {
      const areas = getAreas(grid.gridTemplateAreas)
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
    styleArea(area) {
      return {
        width: `${area.width}px`
      }
    },
    styleGridArea (area, name, index) {
      return {
        position: 'relative',
        backgroundColor: area.colors[index],
        gridArea: name,
        overflow: 'hidden',
      }
    },
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
            position: relative;
            height: 100%;
          }
        }
        .bleed {
          position: absolute;
          border-color: #BDBDBD;
          border-style: dashed;
          border-width: 0;
        }

        .bleed--area {
          top: 0;
          bottom: 0;
          right: -2px;
          border-right-width: 2px;
          border-left-width: 2px;
        }

        .bleed--top {
          border-top-width: 2px;
        }

        .bleed--right {
          border-right-width: 2px;
        }

        .bleed--bottom {
          border-bottom-width: 2px;
        }

        .bleed--left {
          border-left-width: 2px;
        }
      }
    }
  }
}
</style>
