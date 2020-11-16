<template>
  <div>
    <div class="current-colors">
      <div class="palette-color">
        <InputColor
          v-model="colors[0]"
          class="input-color"
          id="color0"
        />
        <InputColor
          v-model="colors[1]"
          class="input-color"
          id="color1"
        />
        <InputColor
          v-model="colors[2]"
          class="input-color"
          id="color2"
        />
        <InputColor
          v-model="colors[3]"
          class="input-color"
          id="color3"
        />
        <InputColor
          v-model="colors[4]"
          class="input-color"
          id="color4"
        />
      </div>
    </div>
    <div class="palette-colors">
      <div
        class="palette-color"
        v-for="(value, key) in defaultColors"
        :key="key"
        v-on:click="colors = value">
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
import { mapGetters } from 'vuex'
import InputColor from '@/components/InputColor.vue'
import { defaultColors } from '@/helpers/color'

export default {
  data () {
    return {
      defaultColors,
    }
  },
  components: {
    InputColor,
  },
  computed: {
    ...mapGetters('menu', [
      'page',
    ]),
    colors: {
      get() {
        return this.page.colors
      },
      set(colors) {
        this.page.colors = colors
      }
    },
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
.current-colors {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.palette-colors {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
  column-gap: 20px;
  .palette-color {
    border: 1px solid #263238;
    border-radius: 4px;
  }
}

.palette-color {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  .color {
    width: 32px;
    height: 32px;
  }
  .input-color {
    width: 40px;
  }
}
</style>
