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
          class="page-head">
          <div class="name">
            <span v-if="format.area === 1">Page {{ pi + 1 }}</span>
            <span v-else-if="pi % 2 === 0">Recto</span>
            <span v-else>Verso</span>
          </div>
          <div
            class="area-name"
            v-if="format.area > 1">
            <div
              v-for="(value, ai) of page.areas"
              :key="ai"
              class="name">
              {{ getAreaName(pi, ai) }}
            </div>
          </div>
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
        </div>
        <div
          :style="stylePage">
          <div
            :style="stylePageContent(pi)"
            v-dropzone="page">
            <div
              v-for="(value, ai) of page.areas"
              :key="ai"
              :style="styleArea(value)"
              class="area"
              :class="{'active': activeArea(value)}">
              <div
                v-if="!menu.background"
                @click="selectPageArea({ page: pi, index: ai })"
                :style="styleGrid(value.grid)"
                class="grid">
                <div
                  v-for="(name, gai) of gridAreas(value.grid)"
                  @click="e => {
                    if (activedElement)
                      return
                    e.stopPropagation()
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
              :style="styleElement(element)"
              class="element"
              :class="{'active': activedElement === element.id }"
              @mousedown="activeElement(element.id)"
              @click="e => {
                e.stopPropagation()
                if (element.type === 'dish' || element.type === 'text')
                  clickElement(element.id)
              }"
              :id="element.id"
              :clicked="clickedElement === element.id">
              <div
                v-if="element.type === 'dish'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-dish="element"
                :style="styleElementDish(element)"
                class="dish">
                <div
                  v-for="(item, index) in element.items"
                  :key="index"
                  :style="styleElementDishItem(element)">
                  <div
                    :style="styleElementDishItemGrid(element)"
                    class="item">
                    <div
                      :style="styleElementDishName(element)">
                      <div>
                        <Editable
                          v-if="menu.translate.inline || !menu.translate.dishName || !translation"
                          v-model="item.name"
                          :inline="true"
                          :contenteditable="clickedElement === element.id"
                        />
                        <Editable
                          v-else
                          v-model="item.translationName[translation]"
                          :inline="true"
                          :contenteditable="clickedElement === element.id"
                        />
                      </div>
                      <div
                        v-if="item.allergens.length"
                        :style="styleElementDishAllergens()">
                        <div
                          v-for="(allergen, key) of item.allergens"
                          :key="key"
                          :style="styleElementDishAllergen(element)">
                          <img
                            :src="allergen.image"
                            :style="styleImage"/>
                        </div>
                      </div>
                      <div v-if="menu.translate.inline && menu.translate.dishName">
                        <Editable
                          v-for="(value, key) in menu.translate.translation"
                          :key="key"
                          v-model="item.translationName[value]"
                          :inline="true"
                          :contenteditable="clickedElement === element.id"
                        />
                      </div>
                    </div>
                    <div :style="styleElementDishPrices(element)">
                      <div
                        v-for="(price, key) in item.prices"
                        :key="key">
                        <div
                          v-if="price || activePrice === `${index}-${key}`"
                          :style="styleElementDishPrice(element)">
                          <Editable
                            v-model="item.prices[key]"
                            :price="true"
                            :inline="true"
                            :contenteditable="clickedElement === element.id"
                            @active="activePrice = `${index}-${key}`"
                            @unactive="activePrice = null"
                          /> {{ menu.prices.currency }}
                        </div>
                      </div>
                    </div>
                    <div
                      :style="styleElementDishDescription(element)">
                      <Editable
                        v-if="menu.translate.inline || !translation"
                        v-model="item.description"
                        :contenteditable="clickedElement === element.id"
                      />
                      <Editable
                        v-else
                        v-model="item.translationDescription[translation]"
                        :contenteditable="clickedElement === element.id"
                      />
                      <div
                        v-if="menu.translate.inline">
                        <Editable
                          v-for="(value, key) in menu.translate.translation"
                          :key="key"
                          v-model="item.translationDescription[value]"
                          :contenteditable="clickedElement === element.id"
                          :style="styleElementDishDescriptionTranslation()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else-if="element.type === 'text'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                :style="styleElementText(element)"
                class="text">
                <Editable
                  v-if="!menu.translate.textes || !translation"
                  v-model="element.html"
                  :contenteditable="!resizedElement && clickedElement === element.id"
                />
                <Editable
                  v-else
                  v-model="element.translation[translation]"
                  :contenteditable="!resizedElement && clickedElement === element.id"
                />
              </div>
              <div
                v-else-if="element.type === 'image'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-scale="{
                  element,
                }"
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
                v-resizable-scale="{
                  element,
                }"
                :style="styleElementIcon(element)">
                <img
                  :src="element.src"
                  :style="styleImage"
                />
              </div>
              <div
                v-else-if="element.type === 'shape'"
                @contextmenu="e => {
                  contextMenuElement(e, element)
                }"
                v-resizable-shape="{
                  element,
                  disabled: activedElement !== element.id
                }"
                :style="styleElementShape(element)">
                <component
                  v-bind:is="element.shape.name"
                  v-bind="element.shape"
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
      clickedElement: state => state.element.clicked,
      resizedElement: state => state.element.resized,
      sidebar: state => state.sidebar.selected,
    }),
    ...mapGetters('menu', [
      'area',
      'gridArea',
      'page',
    ]),
    ...mapGetters('element', [
      'activedText',
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
      this.activeElement(element.id)
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
    getAreaName(pi, ai) {
      if (this.format.area === 3) {
        if (pi % 2 === 0) {
          if (ai === 0)
            return "Volet intérieur"
          else if (ai === 1)
            return "Dos de couverture"
          else
            return "1ére de couverture"
        } else {
          if (ai === 0)
            return "Volet gauche"
          else if (ai === 1)
            return "Volet central"
          else
            return "Volet droit"
        }
      } else {
        if (pi % 2 === 0) {
          if (ai === 0)
            return "Dos de couverture"
          else
            return "1ére de couverture"
        } else {
          if (ai === 0)
            return "Volet gauche"
          else
            return "Volet droit"
        }
      }
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
      .page-head {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        padding: 4px 72px;
        .name {
          display: flex;
          align-items: center;
        }
        .area-name {
          display: flex;
          flex: 1;
          align-items: center;
          position: absolute;
          left: 40px;
          right: 40px;
          .name {
            font-size: 12px;
            flex: inherit;
            justify-content: center;
            margin-top: 12px;
          }
        }
        .actions {
          justify-content: flex-end;
          margin-left: auto;
          button {
            margin-left: 8px;
          }
        }
      }
      .element {
        z-index: 3;
        pointer-events: none;
        &.active {
          > div {
            outline: 1px solid #FFC107;
            &.dish,
            &.text {
              * {
                cursor: inherit !important;
              }
              > .active {
                outline: 1px solid #FFC107;
              }
            }
          }
        }
        &:hover {
          > .dish,
          > .text {
            outline: 1px solid #FFC107;
          }
        }
        > :first-child {
          pointer-events: auto;
        }
      }
      .area {
        position: relative;
        height: 100%;
        &.active {
          outline: 4px solid #FF9800;
          outline-offset: -4px;
          z-index: 1;
          .grid {
            position: absolute;
            z-index: -1;
          }
        }
        .grid {
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
