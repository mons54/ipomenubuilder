<template>
  <div class="palette-colors">
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
      offset-y
      :close-on-click="closeOnClick"
      :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <div class="palette-colors-name">{{ $t('addColor')}}</div>
        <div class="palette-colors-list">
          <div class="color">
            <button
              v-on="on"
              class="picker"
            />
          </div>
        </div>
      </template>
      <ColorPicker v-model="color" @setCloseOnClick="setCloseOnClick"/>
    </v-menu>
    <div>
      <div class="palette-colors-name">{{ $t('defaultColors')}}</div>
      <div class="palette-colors-list">
        <div
          v-for="(color, key) in colors"
          :key="key"
          class="color">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                :class="{ 'active': isActive(color) }"
                :style="`background-color: ${color}`"
                v-on="on"
                v-on:click="$emit('input', color)"
              />
            </template>
            <span>{{ $t(`colors.${labels[key]}`) }}</span>
          </v-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker.vue'
import { colorIsEgual } from '@/helpers/color.js'
import { colorsLabels, colors } from '@/helpers/color.js'

export default {
  components: {
    ColorPicker,
  },
  props: {
    value: String,
  },
  data () {
    return {
      closeOnClick: true,
    }
  },
  methods: {
    isActive (color) {
      return this.value && colorIsEgual(color, this.value)
    },
    setCloseOnClick (value) {
      this.closeOnClick = value
      this.$emit('setCloseOnClick', value)
    },
  },
  computed: {
    labels () {
      return colorsLabels.concat(['black', 'white'])
    },
    colors () {
      const response = []
      colors.forEach(value => {
        if (typeof value[5] === 'string')
          response.push(value[5])
      })
      return response.concat(['#000000', '#FFFFFF'])
    },
    color: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.v-menu__content {
    contain: inherit;
    overflow: visible;
}
.palette-colors {
  background-color: #fff;
  max-width: 21.2rem;
  padding: 0.8rem;

  &-name {
    color: #616161;
    font-weight: 400;
    font-size: 0.9rem;
    margin: 0.2rem;
  }

  &-list {
    display: flex;
    flex-wrap: wrap;

    .color {
      flex: 0 0 2.4rem;
      width: 2.4rem;
      height: 2.4rem;
      margin: 0.2rem;

      button {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        box-shadow: inset 0 0 0 1px rgba(14,19,24,.15);

        &.active {
          box-shadow: 0 0 0 2px #00c4cc, inset 0 0 0 2px #fff;
        }

        &.picker {
          background: center / cover url("/img/picker.webp") no-repeat;
        }
      }
    }
  }
}
</style>
