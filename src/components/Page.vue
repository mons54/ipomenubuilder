<template>
  <div
    :style="stylePage">
    <div
      :style="stylePageContent">
      <div
        v-for="(area, ai) of areas"
        :key="ai"
        :style="styleArea(area)">
        <div
          :style="styleGrid(area.grid)">
          <div
            v-for="(name, gai) of gridAreas(area.grid)"
            :key="gai"
            :style="styleGridArea(area, name, gai)">
            <div
              v-if="area[name] && area[name].image"
              v-image-area="area[name].image"
              :style="styleImageArea(area[name].image)"
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
            <div :style="styleElementDishPrice(element)">
              {{ item.prices[0] }} €
            </div>
            <div :style="styleElementDishDescription(element)">
              {{ item.description }}
            </div>
          </div>
        </div>
        <div
          v-else-if="element.type === 'text'"
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
          :style="styleElementImage(element.rect)">
          <img
            :src="element.image.fullHDURL"
            style="width: 100%; height: 100%;"/>
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
