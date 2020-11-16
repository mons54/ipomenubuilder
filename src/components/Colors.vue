<template>
  <div>
    <div style="display: flex; justify-content: center">
      <div class="palette-color">
        <div
          class="color"
          :style="`backgroundColor: ${colors[0]}`"
        />
        <div
          class="color"
          :style="`backgroundColor: ${colors[1]}`"
        />
        <div
          class="color"
          :style="`backgroundColor: ${colors[2]}`"
        />
        <div
          class="color"
          :style="`backgroundColor: ${colors[3]}`"
        />
        <div
          class="color"
          :style="`backgroundColor: ${colors[4]}`"
        />
      </div>
    </div>
    <div class="palette-colors">
      <div
        class="palette-color"
        v-for="(value, key) in defaultColors"
        :key="key"
        v-on:click="colorsModel = value">
        <div
          v-for="(color, index) in value"
          class="color"
          :key="index"
          :style="`backgroundColor: ${color}`">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { defaultColors } from '@/helpers/color'

export default {
  data () {
    return {
      defaultColors,
    }
  },
  computed: {
    ...mapState({
      colors: state => state.menu.data.colors,
    }),
    colorsModel: {
      get() {
        return this.colors
      },
      set(colors) {
        this.$store.state.menu.data.colors = colors
      }
    }
  },
  methods: {
    random () {
      let colors = this.colors
      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]]
      }
      this.colorsModel = colors
    },
  },
}
</script>

<style lang="scss" scoped>
.palette-colors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 12px;
  column-gap: 24px;
}
.palette-color {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px solid #263238;
  border-radius: 4px;
  margin: 8px 0;
  overflow: hidden;
  place-self: center;
  .color {
    width: 32px;
    height: 32px;
  }
}
</style>
