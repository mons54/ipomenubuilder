export default {
  computed: {
    defaultStyle () {
      return {
        'background-color': this.color,
        'width': '100%',
        'height': '100%',
        'opacity': this.opacity / 100,
      }
    },
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    opacity: {
      type: Number,
      default: () => 100,
    }
  }
}
