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
          v-if="format.area === 1 || pi % 2 === 0"
          class="actions">
          <b-button
            variant="light"
            size="sm"
            @click="duplicatePage(pi)">
            <b-icon-stickies/>
          </b-button>
          <b-button
            variant="light"
            size="sm"
            @click="addPage(pi)">
            <b-icon-plus-square/>
          </b-button>
          <b-button
            v-if="hasDeletePage"
            variant="light"
            size="sm"
            @click="deletePage(pi)">
            <b-icon-trash/>
          </b-button>
        </div>
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
                  selectPageArea({ page: pi, index: ai })
                }"
                :style="styleGrid(value.grid)"
                class="grid"
                :class="{'active': activeArea(value)}">
                <div
                  v-for="(name, gai) of gridAreas(value.grid)"
                  @click="() => {
                    desactiveElement()
                    selectGridArea({ index: ai, name })
                  }"
                  :key="gai"
                  :style="styleGridArea(menu.colors, value, name, gai)"
                  class="grid-area"
                  :class="{'active': activeGridArea(value.areas[name]) }">
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
                  contextMenuElement(e, element)
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
                    <div v-if="menu.translate.inline && menu.translate.dishName">
                      <Editable
                        v-for="(value, key) in menu.translate.translation"
                        :key="key"
                        v-model="item.translationName[value]"
                        :contenteditable="activedElement === element"
                      />
                    </div>
                  </div>
                  <div :style="styleElementDishPrices">
                    <div
                      v-for="(price, key) in item.prices"
                      :key="key">
                      <div
                        v-if="key === 0 || price || activePrice === `${index}-${key}`"
                        :style="styleElementDishPrice(element)">
                        <Editable
                          v-model="item.prices[key]"
                          :price="true"
                          :inline="true"
                          :contenteditable="activedElement === element"
                          @active="activePrice = `${index}-${key}`"
                          @unactive="activePrice = null"
                        /> €
                      </div>
                    </div>
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
                        :style="styleElementDishDescriptionTranslation()"
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
                <div
                  v-for="(text, ti) in element.elements"
                  :key="ti"
                  :style="text.style">
                  <Editable
                    v-if="!menu.translate.textes || !translation"
                    @click.native="activeElementText(text)"
                    v-model="text.value"
                    :contenteditable="activedElement === element"
                  />
                  <Editable
                    v-else
                    @click.native="activeElementText(text)"
                    v-model="text.translation[translation]"
                    :contenteditable="activedElement === element"
                  />
                </div>
              </div>
              <div
                v-else-if="element.type === 'image'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-scale="element.scale"
                :style="styleElementImage(element)">
                <div
                  :style="styleElementImageContent(element)">
                  <img
                    :src="element.image.fullHDURL"
                    :style="styleImage"
                  />
                </div>
              </div>
              <div
                v-else-if="element.type === 'icon'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-scale="element.scale"
                :style="styleElementIcon(element)">
                <img
                  :src="element.src"
                  :style="styleImage"
                />
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
import { addPage } from '@/helpers/menu'
import page from '@/mixins/page'

export default {
  mixins: [page],
  components: {
    Editable,
  },
  data () {
    return {
      activePrice: null,
      spacing: 40,
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
      format: state => state.menu.data.format,
      menuPage: state => state.menu.page,
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
    hasDeletePage() {
      return this.menu.pages.length > 2 || (this.format.area === 1 && this.menu.pages.length > 1)
    },
  },
  methods: {
    ...mapActions('menu', [
      'selectPageArea',
      'selectGridArea',
    ]),
    ...mapMutations('menu', [
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
      'setShowContextMenu',
    ]),
    activeArea(value) {
      return value === this.area && this.sidebar === 'grid' && !this.gridArea
    },
    activeGridArea(value) {
      return this.gridArea === value
    },
    contextMenuElement(e, element) {
      e.preventDefault()
      this.setShowContextMenu(true)
      this.activeElement(element)
      return false
    },
    addPage(index) {
      index++
      if (this.menu.format.area > 1)
        index++
      addPage(this.menu, index)
    },
    duplicatePage(index) {
      const page = JSON.parse(JSON.stringify(this.menu.pages[index]))
      index++
      if (this.menu.format.area > 1) {
        const recto = JSON.parse(JSON.stringify(this.menu.pages[index]))
        index++
        this.menu.pages.splice(index, 0, page, recto)
      } else {
        this.menu.pages.splice(index, 0, page)
      }
    },
    deletePage(index) {
      this.menu.pages.splice(index, 1)
      if (this.menu.format.area > 1)
        this.menu.pages.splice(index, 1)
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
      .actions {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 4px 72px;
        justify-content: flex-end;
        display: flex;
        button {
          margin-left: 8px;
        }
      }
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
