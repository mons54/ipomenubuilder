<template>
  <div class="style-dish">
    <FontFamily
      v-model="styleName.fontFamily"
      text="Police d'écriture"
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
      console.log(this.element.styleName)
      return this.element.styleName
    },
  },
}
</script>
