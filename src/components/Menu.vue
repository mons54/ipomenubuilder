<template>
  <div
    id="menu"
    @click="desactiveElement">
    <div
      v-for="(page, pi) of menu.pages"
      :key="pi"
      class="menu-content"
      :style="styleMenuContent">
      <div
        @click="setMenuPage(pi)"
        class="page-container"
        :style="stylePageContainer">
        <div
          class="page"
          :style="stylePage">
          <div
            :style="stylePageContent"
            v-dropzone="page">
            <div
              v-for="(value, ai) of page.areas"
              :key="ai"
              :style="styleArea(value)"
              class="area">
              <div
                @click="e => {
                  e.stopPropagation()
                  setMenuArea(ai)
                }"
                :style="styleGrid(value.grid)"
                class="grid"
                :class="{'active': activeArea(value)}">
                <div
                  v-for="(name, gai) of gridAreas(value.grid)"
                  @click="() => {
                    if (!isGrid || activeArea(value)) {
                      desactiveElement()
                      selectGridArea({ index: ai, name })
                    }
                  }"
                  :key="gai"
                  :style="styleGridArea(value, name, gai)"
                  class="grid-area"
                  :class="{'active': gridArea === value.areas[name]}">
                  <div
                    v-if="value.areas[name] && value.areas[name].image"
                    v-image-area="value.areas[name].image"
                    :style="styleImageArea(value.areas[name].image)"
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
                @contextmenu="e => {
                  contextMenuDish(e, element)
                }"
                v-resizable-dish="element.rect"
                :style="styleElementDish(element)"
                class="dish">
                <div
                  v-for="(item, index) in element.items"
                  :key="index"
                  :style="styleElementDishItem(element)"
                  class="item">
                  <div
                    :style="styleElementDishName(element)">
                    <Editable
                      v-if="menu.translate.inline || !menu.translate.dishName || !translation"
                      v-model="item.name"
                      :contenteditable="activedElement === element"
                    />
                    <Editable
                      v-else
                      v-model="item.translationName[translation]"
                      :contenteditable="activedElement === element"
                    />
                    <div
                      v-if="menu.translate.inline && menu.translate.dishName">
                      <Editable
                        v-for="(value, key) in menu.translate.translation"
                        :key="key"
                        v-model="item.translationName[value]"
                        :contenteditable="activedElement === element"
                      />
                    </div>
                  </div>
                  <div
                    :style="styleElementDishPrice(element)">
                    <Editable
                      v-model="item.prices[0]"
                      :price="true"
                      :inline="true"
                      :contenteditable="activedElement === element"
                    /> €
                  </div>
                  <div
                    :style="styleElementDishDescription(element)">
                    <Editable
                      v-if="menu.translate.inline || !translation"
                      v-model="item.description"
                      :contenteditable="activedElement === element"
                    />
                    <Editable
                      v-else
                      v-model="item.translationDescription[translation]"
                      :contenteditable="activedElement === element"
                    />
                    <div
                      v-if="menu.translate.inline">
                      <Editable
                        v-for="(value, key) in menu.translate.translation"
                        :key="key"
                        v-model="item.translationDescription[value]"
                        :contenteditable="activedElement === element"
                        style="font-style: italic;"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="element.type === 'text'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-scale="element.scale"
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
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-image="element"
                :style="styleElementImage(element.rect)">
                <div
                  :style="styleElementImageContent(element)">
                  <img
                    :src="element.image.fullHDURL"
                    style="width: 100%; height: 100%;"/>
                </div>
              </div>
              <div
                v-else-if="element.type === 'icon'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-scale="element.scale"
                :style="styleElementIcon(element)"
                v-html="element.src"
              />
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
      translation: state => state.menu.translation,
      scale: state => state.scale.value,
      activedElement: state => state.element.actived,
      sidebar: state => state.sidebar.selected,
    }),
    ...mapGetters('menu', [
      'area',
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
    isGrid() {
      return this.sidebar === 'grid'
    },
    styleMenuContent () {
      const height = `${this.fullHeight * this.scale}px`
      return {
        width: `${this.fullWidth * this.scale}px`,
        height,
        flex: `0 0 ${height}`,
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
    ...mapMutations('menu', [
      'setMenuArea',
      'setMenuPage',
    ]),
    ...mapActions('element', [
      'activeElement',
      'desactiveElement',
      'clickElement',
    ]),
    ...mapMutations('element', [
      'activeElementText',
    ]),
    ...mapMutations('contextmenu', [
      'setContextMenuElement',
      'setContextMenuType',
      'setShowContextMenu',
    ]),
    activeArea(value) {
      return value === this.area && (this.isGrid || this.sidebar === 'color')
    },
    contextMenuDish(e, element) {
      e.preventDefault()
      this.setContextMenuType('dish')
      this.setShowContextMenu(true)
      this.activeElement(element)
      return false
    },
    contextMenuElement(e, element) {
      e.preventDefault()
      this.setContextMenuType('element')
      this.setShowContextMenu(true)
      this.activeElement(element)
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
#menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 40px;
  overflow: auto;
  .menu-content {
    margin: auto;
    .page-container {
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
        .grid {
          &.active {
            position: absolute;
            outline: 4px solid #FFC107;
            z-index: 2;
          }
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
                border: 4px solid #FFC107;
                outline-offset: -4px;
                z-index: 2;
              }
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
