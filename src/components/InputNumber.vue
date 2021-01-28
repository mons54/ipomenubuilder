<template>
  <b-form-input
    v-model="model"
    type="number"
    @focus="focus"
    @blur="blur"
    :id="id"
    :step="step"
    :max="max"
    :min="min"
    :size="size"
  />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  props: {
    value: [String, Number],
    id: String,
    size: String,
    step: Number,
    max: Number,
    min: Number,
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
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
    focus() {
      this.stopHistory()
    },
    blur() {
      this.startHistory()
      this.addHistory()
    },
  },
}
</script>
