<template>
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
            :style="stylePageContent"
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
                v-if="element.type === 'dish'"
                v-resizable-dish="element.rect"
                :style="styleElementDish(element.rect)">
                <div
                  v-for="(item, index) in element.items"
                  :key="index"
                  :style="element.styleItem"
                  class="item">
                  <div :style="element.styleName">
                    {{ item.name}}
                  </div>
                  <div :style="element.styleDescription">
                    {{ item.description }}
                  </div>
                  <div :style="element.stylePrice">
                    {{ item.prices[0] }} €
                  </div>
                </div>
              </div>
              <div
                v-else-if="element.type === 'text'"
                v-resizable-text="element.scale"
                :style="styleElementText(element.scale)">
                <div
                  v-for="(text, ti) in element.elements"
                  v-html="text.html"
                  :key="ti"
                  :style="text.style">
                </div>
              </div>
              <div
                v-else-if="element.type === 'image'"
                v-resizable-image="element.rect"
                :style="styleElementImage(element.rect)">
                <img
                  :src="element.image.webformatURL"
                  style="width: 100%; height: 100%;"/>
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
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import page from '@/mixins/page.js'

export default {
  mixins: [page],
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
    safeZone () {
      return this.format.safeZone
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
  },
}
</script>

<style lang="scss" scoped>
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
      .area {
        position: relative;
        height: 100%;
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
</style>
