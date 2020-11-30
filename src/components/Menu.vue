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
              id="pageContent"
              v-dropzone="page">
              <div
                v-for="(area, ai) of areas"
                :key="ai"
                :style="styleArea(area)"
                class="area">
                <div
                  :style="styleGrid(area.grid)"
                  class="grid">
                  <div
                    v-for="(name, gai) of gridAreas(area.grid)"
                    @click="selectGridArea({ index: ai, name })"
                    :key="gai"
                    :style="styleGridArea(area, name, gai)"
                    class="grid-area">
                    <div
                      v-if="area[name] && area[name].image"
                      v-image-area="area[name].image"
                      :style="styleImageArea(area[name].image)"
                    />
                  </div>
                </div>
                <div
                  v-if="ai + 1 !== areas.length"
                  class="bleed bleed--area"
                />
              </div>
              <div
                v-for="element of page.elements"
                v-draggable="element"
                :key="element.id"
                :style="styleElement(element.rect)">
                <div
                  v-if="element.type === 'text'"
                  v-resizable.preserve="element.scale"
                  :style="styleElementContent(element.scale)">
                  <div
                    v-for="(text, ti) in element.value.elements"
                    v-html="text.html"
                    :key="ti"
                    :style="text.style">
                  </div>
                </div>
                <div
                  v-if="element.type === 'dish'"
                  v-resizable.preserve="element.scale"
                  :style="styleElementContent(element.scale)">
                  <div
                    v-for="(item, index) in element.value.items"
                    :key="index"
                    :style="element.value.styleItem"
                    class="item">
                    <div :style="element.value.styleName">
                      {{ item.name}}
                    </div>
                    <div :style="element.value.styleDescription">
                      {{ item.description }}
                    </div>
                    <div :style="element.value.stylePrice">
                      {{ item.prices[0] }} €
                    </div>
                  </div>
                </div>
                <div
                  v-if="element.type === 'image'"
                  v-resizable.preserve="element.scale"
                  :style="styleElementContent(element.scale)">
                  <img :src="element.value.image.webformatURL"/>
                </div>
              </div>
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
import Vue from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import { getAreas } from '@/helpers/grid'

function imageArea (el, { value }, vnode) {
  if (!value.size)
    return
  let backgroundSize
  const rect = el.parentNode.getBoundingClientRect()
  const ratio = rect.width / value.width
  if (rect.height > ratio * value.height)
    backgroundSize = `auto ${value.size}%`
  else
    backgroundSize = `${value.size}% auto`
  if (backgroundSize !== value.backgroundSize) {
    vnode.context.$store.commit('history/breakHistory')
    Vue.set(value, 'backgroundSize', backgroundSize)
  }
}

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
        ...this.menu.styles.page,
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
    ...mapActions('menu', [
      'selectGridArea',
    ]),
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
    styleImageArea (image) {

      const style = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${image.webformatURL})`,
        transform: '',
      }

      if (!isNaN(image.positionX))
        style.backgroundPositionX = `${image.positionX}%`
      else
        style.backgroundPositionX = 'center'

      if (!isNaN(image.positionY))
        style.backgroundPositionY = `${image.positionY}%`
      else
        style.backgroundPositionY = 'center'

      if (image.backgroundSize)
        style.backgroundSize = image.backgroundSize
      else
        style.backgroundSize = 'contain'

      if (image.flipHorizontal)
        style.transform += 'scaleX(-1)'
      if (image.flipVertical)
        style.transform += 'scaleY(-1)'

      if (image.filter)
        style.filter = image.filter

      return style
    },
    styleElement(rect) {
      return {
        position: 'absolute',
        width: 'fit-content',
        transform: `translate(${rect.left}px, ${rect.top}px)`,
      }
    },
    styleElementContent(scale) {
      return {
        transform: `scale(${scale.x}, ${scale.y})`,
      }
    },
  },
  directives: {
    imageArea: {
      componentUpdated: imageArea,
      inserted: imageArea,
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
        #pageContent {
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
