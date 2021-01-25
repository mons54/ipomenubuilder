<template>
  <div
    :style="{
      ...stylePage,
      overflow: 'hidden'
    }">
    <div
      :style="stylePageContent">
      <div
        v-for="(value, ai) of page.areas"
        :key="ai"
        :style="styleArea(value)">
        <div
          :style="styleGrid(value.grid)">
          <div
            v-for="(name, gai) of gridAreas(value.grid)"
            :key="gai"
            :style="styleGridArea(menu.colors, value, name, gai)">
            <div
              v-if="value.areas[name] && value.areas[name].image"
              v-image-area="value.areas[name].image"
              :style="styleImageArea(value.areas[name].image)"
            />
          </div>
        </div>
      </div>
      <div
        v-for="element of page.elements"
        :key="element.id"
        :style="styleElement(element.rect)">
        <div
          v-if="element.type === 'dish'"
          :style="styleElementDish(element)">
          <div
            v-for="(item, index) in element.items"
            :key="index"
            :style="styleElementDishItem(element)"
            class="item">
            <div :style="styleElementDishName(element)">
              {{ item.name}}
            </div>
            <div :style="styleElementDishPrices">
              <div
                v-for="(price, key) in item.prices"
                :key="key">
                <div
                  v-if="price"
                  :style="styleElementDishPrice(element)">
                  {{ price }} €
                </div>
              </div>
            </div>
            <div :style="styleElementDishDescription(element)">
              {{ item.description }}
            </div>
          </div>
        </div>
        <div
          v-else-if="element.type === 'text'"
          :style="styleElementText(element)">
          <div
            v-for="(text, ti) in element.elements"
            v-html="text.value"
            :key="ti"
            :style="text.style">
          </div>
        </div>
        <div
          v-else-if="element.type === 'image'"
          :style="styleElementImage(element)">
          <img
            :src="element.image.fullHDURL"
            :style="styleImage"/>
        </div>
        <div
          v-else-if="element.type === 'icon'"
          :style="styleElementIcon(element)">
          <img
            :src="element.src"
            :style="styleImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import page from '@/mixins/page.js'

export default {
  mixins: [page],
  props: {
    format: Object,
    menu: Object,
    page: Object,
    mark: Boolean,
  },
  computed: {
    bleed () {
      return this.mark ? this.format.bleed : 0
    },
  }
}
</script>
