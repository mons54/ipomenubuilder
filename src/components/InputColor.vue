<template>
  <div>
    <b-form-input
      class="color"
      v-model="model"
      @click="e => {
        e.preventDefault()
        showColor = !showColor
      }"
      :id="id"
      :size="size"
      type="color"
    />
    <div @click="e => {
      e.preventDefault()
      e.stopPropagation()
    }">
      <Sketch
        class="colors"
        v-if="showColor"
        v-model="model"
      />
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: {
    Sketch,
  },
  props: {
    value: String,
    id: String,
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      showColor: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.value || '#000000'
      },
      set(value) {
        this.$emit('input', value.hex)
      }
    }
  },
  methods: {
    ...mapActions('history', [
      'addHistory',
    ]),
    ...mapMutations('history', [
      'startHistory',
      'stopHistory',
    ]),
  },
  watch: {
    showColor(value) {
      const hideColor = () => {
        this.startHistory()
        this.addHistory()
        this.showColor = false
        document.body.removeEventListener('click', hideColor)
      }
      if (value) {
        this.showColor = true
        this.stopHistory()
        setTimeout(() => document.body.addEventListener('click', hideColor))
      }
    },
  },
}
</script>

<style scoped lang="scss">
div {
  position: relative;
  width: 100%;
  .color {
    cursor: pointer;
  }
  .colors {
    position: fixed;
    width: 200px;
    z-index: 9;
  }
}
</style>
