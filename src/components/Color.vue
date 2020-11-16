<template>
  <div class="color" :style="`backgroundColor: ${color}`">
  </div>
</template>

<script>

export default {
  props: {
    value: String,
    label: String,
    remove: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    width: {
      type: Number,
      default: 44,
    },
    height: {
      type: Number,
      default: 24,
    },
    borderRaduis: {
      type: Number,
      default: 2,
    },
  },
  data () {
    return {
      closeOnClick: true,
      isOpen: false,
    }
  },
  computed: {
    color: {
      get () {
        return this.value || ''
      },
      set (value) {
        if (value === this.color)
          return
        this.$store.commit('breakHistory')
        this.$emit('input', value)
      },
    },
  },
  methods: {
    removeColor () {
      this.$emit('input')
    },
  },
  watch: {
    isOpen (value) {
      if (!value)
        this.$store.dispatch('addHistory')
    },
  },
}
</script>

<style lang="scss" scoped>
.colors {
  display: flex;
  align-items: center;
  .btn-color {
    position: relative;
    user-select: none;
    overflow: hidden;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat;
    cursor: pointer;
    &[disabled] {
      cursor: auto;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
