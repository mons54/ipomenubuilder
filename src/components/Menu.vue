<template>
  <div
    id="menu"
    @click="desactiveElement">
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
                  class="grid-area"
                  :class="{'active': gridArea === area[name]}">
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
              :style="styleElement(element.rect)"
              class="element"
              :class="{'active': activedElement === element}"
              @mousedown="clickElement(element)"
              @click="e => {
                e.stopPropagation()
                activeElement(element)
              }">
              <div
                v-if="element.type === 'dish'"
                v-resizable-dish="element.rect"
                :style="styleElementDish(element)"
                class="dish">
                <div
                  v-for="(item, index) in element.items"
                  :key="index"
                  :style="styleElementDishItem(element)"
                  class="item">
                  <Editable
                    v-model="item.name"
                    :style="styleElementDishName(element)"
                    :contenteditable="activedElement === element"
                  />
                  <div
                    :style="styleElementDishPrice(element)">
                    <Editable
                      v-model="item.prices[0]"
                      :price="true"
                      :inline="true"
                      :contenteditable="activedElement === element"
                    /> €
                  </div>
                  <Editable
                    v-model="item.description"
                    :style="styleElementDishDescription(element)"
                    :contenteditable="activedElement === element"
                  />
                </div>
              </div>
              <div
                v-else-if="element.type === 'text'"
                v-resizable-text="element.scale"
                :style="styleElementText(element)"
                class="text">
                <Editable
                  v-for="(text, ti) in element.elements"
                  @click.native="activeElementText(text)"
                  v-model="text.html"
                  :style="text.style"
                  :contenteditable="activedElement === element"
                  :key="ti"
                />
              </div>
              <div
                v-else-if="element.type === 'image'"
                v-resizable-image="element"
                :style="styleElementImage(element.rect)">
                <div
                  :style="styleElementImageContent(element)">
                  <img
                    :src="element.image.fullHDURL"
                    style="width: 100%; height: 100%;"/>
                </div>
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
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import Editable from '@/components/Editable'
import page from '@/mixins/page'

export default {
  mixins: [page],
  components: {
    Editable,
  },
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
      activedElement: state => state.element.actived,
    }),
    ...mapGetters('menu', [
      'gridArea',
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
    ...mapActions('element', [
      'activeElement',
      'clickElement',
    ]),
    ...mapMutations('element', [
      'activeElementText',
      'desactiveElement',
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
      overflow: hidden;
      .element {
        z-index: 3;
        &.active {
          > div {
            outline: 1px solid #FFC107;
            &.dish,
            &.text {
              cursor: default !important;
            }
          }
        }
        &:hover {
          > .dish,
          > .text {
            outline: 1px solid #FFC107;
          }
        }
      }
      .area {
        position: relative;
        height: 100%;
        .grid-area {
          &.active {
            &:after {
              content: "";
              position: absolute;
              display: block;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              border: 4px solid #F44336;
              outline-offset: -4px;
              z-index: 2;
            }
          }
        }
      }
      .bleed {
        position: absolute;
        border-color: #BDBDBD;
        border-style: dashed;
        border-width: 0;
        z-index: 1;
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
