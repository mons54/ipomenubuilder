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
    borderColor: {
      type: String,
      required: true,
    },
    borderStyle: {
      type: String,
      required: true,
    },
    boxShadowColor: {
      type: String,
      required: true,
    },
    borderWidth: {
      type: Number,
      required: true,
    },
    boxShadowWidth: {
      type: Number,
      required: true,
    },
  },
}
</script>
