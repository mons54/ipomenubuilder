<template>
  <div class="style-dish">
    <FontFamily
      v-model="style.fontFamily"
    />
    <FontStyle
      v-model="style"
      :textAlign="true"
      @fontWeight="fontWeight"
      @fontStyle="fontStyle"
      @textDecoration="textDecoration"
      class="mt-4"
    />
    <b-row class="mt-4">
      <b-col md="4">
        <label for="textColor">{{ $t('lineHeight') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="style.lineHeight"
          :min="0"
          :max="4"
          :step="0.1"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import FontFamily from '@/components/FontFamily'
import FontStyle from '@/components/FontStyle'
import InputRange from '@/components/InputRange'

export default {
  props: {
    element: Object,
  },
  components: {
    FontFamily,
    FontStyle,
    InputRange,
  },
  computed: {
    style() {
      return this.element.style
    },
  },
  methods: {
    fontWeight(value) {
      Vue.set(this.style, 'fontWeight', value)
    },
    fontStyle(value) {
      Vue.set(this.style, 'fontStyle', value)
    },
    textDecoration(value) {
      Vue.set(this.style, 'textDecoration', value)
    },
  },
}
</script>

<style lang="css" scoped>
</style>
