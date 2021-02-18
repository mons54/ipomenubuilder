<template>
  <div class="style-dish">
    <h6>{{ $t('dishName') }}</h6>
    <FontFamily
      v-model="fontFamilyName"
    />
    <FontStyle
      v-model="styleName"
      @fontWeight="fontWeightName"
      @fontStyle="fontStyleName"
      @textDecoration="textDecorationName"
      class="mt-2"
    />
    <h6 class="mt-3">{{ $t('dishDescription') }}</h6>
    <FontFamily
      v-model="fontFamilyDescription"
    />
    <FontStyle
      v-model="styleDescription"
      @fontWeight="fontWeightDescription"
      @fontStyle="fontStyleDescription"
      @textDecoration="textDecorationDescription"
      class="mt-2"
    />
    <h6 class="mt-3">{{ $t('dishPrice') }}</h6>
    <FontFamily
      v-model="fontFamilyPrice"
    />
    <FontStyle
      v-model="stylePrice"
      @fontWeight="fontWeightPrice"
      @fontStyle="fontStylePrice"
      @textDecoration="textDecorationPrice"
      class="mt-2"
    />
    <b-row class="mt-4">
      <b-col md="4">
        <label for="textColor">{{ $t('spacing') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="marginItem"
          :min="0"
          :max="50"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4">
        <label for="textColor">{{ $t('lineHeight') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="styleItem.lineHeight"
          :min="0"
          :max="4"
          :step="0.1"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4">
        <label for="textColor">{{ $t('allergen') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="allergen"
          :min="6"
          :max="100"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4">
        <label for="textColor">{{ $t('price') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="element.priceWidth"
          :min="8"
          :max="200"
        />
      </b-col>
    </b-row>
    <div class="grid mt-4">
      <div
        v-for="(value, index) of gridsDish"
        v-on:click="grid = value"
        :key="index"
        :style="value.template"
        :class="{'active': grid == value}"
        class="item-template">
        <div
          class="item-area item-area--name"
          :style="value.name">
          Nom
        </div>
        <div
          class="item-area item-area--price"
          :style="value.prices">
           €
        </div>
        <div
          class="item-area item-area--description"
          :style="value.description">
          Desc
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import FontFamily from '@/components/FontFamily'
import FontStyle from '@/components/FontStyle'
import InputRange from '@/components/InputRange'
import { gridsDish } from '@/helpers/dish.js'

export default {
  props: {
    element: Object,
  },
  components: {
    FontFamily,
    FontStyle,
    InputRange,
  },
  data () {
    return {
      gridsDish,
    }
  },
  computed: {
    ...mapState({
      pages: state => state.menu.data.pages,
    }),
    dishes() {
      let dishes = []
      for (const page of this.pages) {
        for (const element of page.elements) {
          if (element.type !== 'dish')
            continue
          dishes.push(element)
        }

      }
      return dishes
    },
    styleItem() {
      return this.element.styleItem
    },
    styleName() {
      return this.element.styleName
    },
    styleDescription() {
      return this.element.styleDescription
    },
    stylePrice() {
      return this.element.stylePrice
    },
    styleAllergen() {
      return this.element.styleAllergen
    },
    fontFamilyName: {
      get() {
        return this.styleName.fontFamily
      },
      set(value) {
        this.dishes.forEach(dish => {
          dish.styleName.fontFamily = value
        })
      }
    },
    fontFamilyDescription: {
      get() {
        return this.styleDescription.fontFamily
      },
      set(value) {
        this.dishes.forEach(dish => {
          dish.styleDescription.fontFamily = value
        })
      }
    },
    fontFamilyPrice: {
      get() {
        return this.stylePrice.fontFamily
      },
      set(value) {
        this.dishes.forEach(dish => {
          dish.stylePrice.fontFamily = value
        })
      }
    },
    marginItem: {
      get() {
        return parseInt(this.styleItem.marginBottom)
      },
      set(value) {
        this.styleItem.marginBottom = `${value}px`
      }
    },
    allergen: {
      get() {
        return parseInt(this.styleAllergen.width)
      },
      set(value) {
        this.styleAllergen.width = `${value}px`
      }
    },
    grid: {
      get () {
        return this.element.grid
      },
      set (value) {
        Vue.set(this.element, 'grid', value)
      },
    },
  },
  methods: {
    fontWeightName(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.styleName, 'fontWeight', value)
      })
    },
    fontStyleName(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.styleName, 'fontStyle', value)
      })
    },
    textDecorationName(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.styleName, 'textDecoration', value)
      })
    },
    fontWeightDescription(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.styleDescription, 'fontWeight', value)
      })
    },
    fontStyleDescription(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.styleDescription, 'fontStyle', value)
      })
    },
    textDecorationDescription(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.styleDescription, 'textDecoration', value)
      })
    },
    fontWeightPrice(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.stylePrice, 'fontWeight', value)
      })
    },
    fontStylePrice(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.stylePrice, 'fontStyle', value)
      })
    },
    textDecorationPrice(value) {
      this.dishes.forEach(dish => {
        Vue.set(dish.stylePrice, 'textDecoration', value)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 8px;
  row-gap: 8px;
  .item-template {
    cursor: pointer;
    background-color: #a8adaf;
    column-gap: 0 !important;
    row-gap: 0 !important;
    align-items: center !important;
    line-height: 0 !important;
    &.active {
      outline: 1px solid #8fcaf9;
    }
    .item-area {
      display: grid;
      padding: 0 8px;
      height: 20px;
      align-items: center;
      margin: 0 !important;
      &--name {
        grid-area: name;
        background-color: #263238;
        font-size: 13px;
      }
      &--description {
        grid-area: description;
        background-color: #607D8B;
        font-size: 11px;
      }
      &--price {
        grid-area: price;
        background-color: #ECEFF1;
        color: #000;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}
</style>
