<template>
  <div class="style-dish">
    <h6>Nom de plat</h6>
    <FontFamily
      v-model="styleName.fontFamily"
    />
    <FontStyle
      v-model="styleName"
      @fontWeight="fontWeight"
      @fontStyle="fontStyle"
      @textDecoration="textDecoration"
      class="mt-2"
    />
    <h6 class="mt-2">Description</h6>
    <FontFamily
      v-model="styleDescription.fontFamily"
    />
    <h6 class="mt-2">Prix</h6>
    <FontFamily
      v-model="stylePrice.fontFamily"
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
    fontWeight(value) {
      Vue.set(this.styleName, 'fontWeight', value)
    },
    fontStyle(value) {
      Vue.set(this.styleName, 'fontStyle', value)
    },
    textDecoration(value) {
      Vue.set(this.styleName, 'textDecoration', value)
    }
  }
}
</script>
