<template>
  <div class="style-dish">
    <h6>Nom de plat</h6>
    <FontFamily
      v-model="styleName.fontFamily"
    />
    <FontStyle
      v-model="styleName"
      @fontWeight="fontWeightName"
      @fontStyle="fontStyleName"
      @textDecoration="textDecorationName"
      class="mt-2"
    />
    <h6 class="mt-2">Description</h6>
    <FontFamily
      v-model="styleDescription.fontFamily"
    />
    <FontStyle
      v-model="styleDescription"
      @fontWeight="fontWeightDescription"
      @fontStyle="fontStyleDescription"
      @textDecoration="textDecorationDescription"
      class="mt-2"
    />
    <h6 class="mt-2">Prix</h6>
    <FontFamily
      v-model="stylePrice.fontFamily"
    />
    <FontStyle
      v-model="styleDescription"
      @fontWeight="fontWeightPrice"
      @fontStyle="fontStylePrice"
      @textDecoration="textDecorationPrice"
      class="mt-2"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import FontFamily from '@/components/FontFamily'
import FontStyle from '@/components/FontStyle'

export default {
  props: {
    element: Object,
  },
  components: {
    FontFamily,
    FontStyle,
  },
  computed: {
    styleName() {
      return this.element.styleName
    },
    styleDescription() {
      return this.element.styleDescription
    },
    stylePrice() {
      return this.element.stylePrice
    },
  },
  methods: {
    fontWeightName(value) {
      Vue.set(this.styleName, 'fontWeight', value)
    },
    fontStyleName(value) {
      Vue.set(this.styleName, 'fontStyle', value)
    },
    textDecorationName(value) {
      Vue.set(this.styleName, 'textDecoration', value)
    },
    fontWeightDescription(value) {
      Vue.set(this.styleDescription, 'fontWeight', value)
    },
    fontStyleDescription(value) {
      Vue.set(this.styleDescription, 'fontStyle', value)
    },
    textDecorationDescription(value) {
      Vue.set(this.styleDescription, 'textDecoration', value)
    },
    fontWeightPrice(value) {
      Vue.set(this.stylePrice, 'fontWeight', value)
    },
    fontStylePrice(value) {
      Vue.set(this.stylePrice, 'fontStyle', value)
    },
    textDecorationPrice(value) {
      Vue.set(this.stylePrice, 'textDecoration', value)
    }
  }
}
</script>
