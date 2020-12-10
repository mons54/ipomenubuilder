<template>
  <div class="style-dish">
    <h6>Nom de plat</h6>
    <FontFamily
      v-model="styleName.fontFamily"
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
import FontFamily from '@/components/FontFamily'

export default {
  props: {
    element: Object,
  },
  components: {
    FontFamily
  },
  data() {
    return {
      fonts: this.$fonts.get('sans-serif')
    }
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
}
</script>
