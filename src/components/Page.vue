<template>
  <div
    :style="{
      ...stylePage,
      overflow: 'hidden'
    }">
    <div
      :style="stylePageContent(pi)">
      <div
        v-for="(value, ai) of areas(page.areas)"
        :key="ai"
        :style="styleArea(value)">
        <div
          v-if="!menu.background"
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
        :style="styleElement(element)">
        <div
          v-if="element.type === 'dish'"
          :style="styleElementDish(element)">
          <div
            v-for="(item, index) in element.items"
            :key="index"
            :style="styleElementDishItem(element)">
            <div :style="styleElementDishItemGrid(element)">
              <div :style="styleElementDishName(element)">
                <span v-if="!translation">
                  {{ item.name }}
                </span>
                <span v-else>
                  {{ item.translationName[translation] }}
                </span>
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
                  <span
                    v-for="(value, key) in menu.translate.translation"
                    :key="key">
                    {{ item.translationName[value] }}
                  </span>
                </div>
              </div>
              <div :style="styleElementDishPrices(element)">
                <div
                  v-for="(price, key) in item.prices"
                  :key="key">
                  <div
                    v-if="price"
                    :style="styleElementDishPrice(element)">
                    {{ price|price(menu.prices) }} {{ menu.prices.currency }}
                  </div>
                </div>
              </div>
              <div :style="styleElementDishDescription(element)">
                <span v-if="!translation">
                  {{ item.description }}
                </span>
                <span v-else>
                  {{ item.translationDescription[translation] }}
                </span>
                <div
                  v-if="menu.translate.inline">
                  <span
                    v-for="(value, key) in menu.translate.translation"
                    :key="key"
                    :style="styleElementDishDescriptionTranslation()">
                    {{ item.translationDescription[value] }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else-if="element.type === 'text'"
          :style="styleElementText(element)">
          <span v-if="!menu.translate.textes || !translation">
            {{ element.html }}
          </span>
          <span v-else>
            {{ element.translation[translation] }}
          </span>
        </div>
        <div
          v-else-if="element.type === 'image'"
          :style="styleElementImage(element)">
          <div
            :style="styleElementImageContent(element)">
            <img
              :src="element.image.fullHDURL"
              :style="styleImage"/>
          </div>
        </div>
        <div
          v-else-if="element.type === 'icon'"
          :style="styleElementIcon(element)">
          <img
            :src="element.src"
            :style="styleImage"
          />
        </div>
        <div
          v-else-if="element.type === 'shape'"
          :style="styleElementShape(element)">
          <component
            v-bind:is="element.shape.name"
            v-bind="element.shape"
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
    pi: Number,
    mark: Boolean,
    translation: String,
  },
  computed: {
    bleed () {
      return this.mark ? this.format.bleed : 0
    },
  }
}
</script>
