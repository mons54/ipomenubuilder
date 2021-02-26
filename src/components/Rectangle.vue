<template>
  <div
    :style="style"/>
</template>

<script>
import shape from '@/mixins/shape'

export default {
  mixins: [shape],
  computed: {
    style () {
      return {
        ...this.defaultStyle,
        'border-width': `${this.borderWidth}px`,
        'border-color': this.borderColor,
        'border-style': this.borderStyle,
        'box-shadow': `${this.boxShadowWidth}px ${this.boxShadowWidth}px ${this.boxShadowWidth}px ${this.boxShadowColor}`
      }
    }
  },
  props: {
    borderColor: String,
    borderStyle: String,
    boxShadowColor: String,
    borderWidth: [String, Number],
    boxShadowWidth: [String, Number],
  },
}
</script>
