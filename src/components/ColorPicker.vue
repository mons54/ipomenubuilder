<template>
  <div class="color">
    <div
      class="color-picker"
      id="colorPicker"
      :acp-color="value"
      acp-show-rgb="no"
      acp-show-hsl="no"
      acp-show-hex="no"
      acp-show-alpha
    />
    <div
      v-if="colorPicker"
      class="color-values">
      <div
        v-if="valueType === 'hex'"
        class="field">
        <div>
          <input
            v-model="hex"
            maxlength="9"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>HEX</div>
        </div>
      </div>
      <div
        v-if="valueType === 'rgba'"
        class="field">
        <div>
          <input
            v-model="rgbaRed"
            type="number"
            step="1"
            min="0"
            max="255"
            maxlength="3"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>R</div>
        </div>
        <div>
          <input
            v-model="rgbaGreen"
            type="number"
            step="1"
            min="0"
            max="255"
            maxlength="3"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>G</div>
        </div>
        <div>
          <input
            v-model="rgbaBlue"
            type="number"
            step="1"
            min="0"
            max="255"
            maxlength="3"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>B</div>
        </div>
        <div>
          <input
            v-model="rgbaAlpha"
            type="number"
            step="0.1"
            min="0"
            max="1"
            maxlength="4"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>A</div>
        </div>
      </div>
      <div
        v-if="valueType === 'hsla'"
        class="field">
        <div>
          <input
            v-model="hslaHue"
            type="number"
            step="1"
            min="0"
            max="360"
            maxlength="3"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>H</div>
        </div>
        <div>
          <input
            v-model="hslaSaturation"
            type="number"
            step="1"
            min="0"
            max="100"
            maxlength="4"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>S</div>
        </div>
        <div>
          <input
            v-model="hslaLightness"
            type="number"
            step="1"
            min="0"
            max="100"
            maxlength="4"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>L</div>
        </div>
        <div>
          <input
            v-model="hslaAlpha"
            type="number"
            step="0.1"
            min="0"
            max="1"
            maxlength="4"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
          />
          <div>A</div>
        </div>
      </div>
      <div
        v-on:click="setValueType()"
        class="arrows">
        <div class="arrow arrow-top"/>
        <div class="arrow arrow-bottom"/>
      </div>
    </div>
    <div class="swatches">
      <ul
        v-for="(value, labelKey) in colors"
        :key="labelKey">
        <li
          v-for="(color, shadeKey) in value"
          :key="shadeKey">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <button
                :class="{ 'active': isActive(color) }"
                :style="`background-color: ${color}`"
                v-on="on"
                v-on:click="setColor(color)"
              />
            </template>
            <span>
              {{ $t(`colors.${colorsLabels[labelKey]}`) }}
              {{colorsShades[shadeKey]}}
            </span>
          </v-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { createPicker } from 'a-color-picker'
import {
  colorIsEgual,
  colorToHexa,
  colorToRgba,
  colorToHsla,
  rgbaToCss,
  hslaToCss,
  hexaIsValid,
  rgbaIsValid,
  hslaIsValid,
} from '@/helpers/color.js'
import { colorsLabels, colorsShades, colors } from '@/helpers/color.js'

export default {
  props: {
    value: String,
    width: {
      type: Number,
      default: 240,
    },
  },
  data() {
    return {
      colorPicker: null,
      valueType: 'hex',
      colorsLabels,
      colorsShades,
      colors,
    }
  },
  computed: {
    hex: {
      get () {
        return colorToHexa(this.value)
      },
      set (color) {
        if (!color.startsWith('#'))
          color = `#${color}`
        if (hexaIsValid(color))
          this.setColor(color)
      },
    },
    rgba () {
      return colorToRgba(this.value)
    },
    rgbaRed: {
      get() {
        return this.rgba[0]
      },
      set(value) {
        Vue.set(this.rgba, 0, value)
        this.setColorRgba()
      },
    },
    rgbaGreen: {
      get() {
        return this.rgba[1]
      },
      set(value) {
        Vue.set(this.rgba, 1, value)
        this.setColorRgba()
      },
    },
    rgbaBlue: {
      get() {
        return this.rgba[2]
      },
      set(value) {
        Vue.set(this.rgba, 2, value)
        this.setColorRgba()
      },
    },
    rgbaAlpha: {
      get() {
        return this.rgba[3]
      },
      set(value) {
        Vue.set(this.rgba, 3, value)
        this.setColorRgba()
      },
    },
    hsla () {
      return colorToHsla(this.value)
    },
    hslaHue: {
      get() {
        return this.hsla[0]
      },
      set(value) {
        Vue.set(this.hsla, 0, value)
        this.setColorHsla()
      },
    },
    hslaSaturation: {
      get() {
        return this.hsla[1]
      },
      set(value) {
        Vue.set(this.hsla, 1, value)
        this.setColorHsla()
      },
    },
    hslaLightness: {
      get() {
        return this.hsla[2]
      },
      set(value) {
        Vue.set(this.hsla, 2, value)
        this.setColorHsla()
      },
    },
    hslaAlpha: {
      get() {
        return this.hsla[3]
      },
      set(value) {
        Vue.set(this.hsla, 3, value)
        this.setColorHsla()
      },
    },
  },
  methods: {
    setColor(color) {
      this.$emit('input', color)
    },
    setColorRgba() {
      const color = rgbaToCss(
        this.rgba[0],
        this.rgba[1],
        this.rgba[2],
        this.rgba[3]
      )
      if (rgbaIsValid(color))
        this.$emit('input', color)
    },
    setColorHsla() {
      const color = hslaToCss(
        this.hsla[0],
        parseInt(this.hsla[1]),
        parseInt(this.hsla[2]),
        this.hsla[3]
      )
      if (hslaIsValid(color))
        this.$emit('input', color)
    },
    setValueType() {
      if (this.valueType === 'hex')
        this.valueType = 'rgba'
      else if (this.valueType === 'rgba')
        this.valueType = 'hsla'
      else
        this.valueType = 'hex'
    },
    isActive (color) {
      return colorIsEgual(color, this.value)
    },
  },
  watch: {
    value (value) {
      if (value.startsWith('hsl'))
        value = value.replace(/%/g, '')
      this.colorPicker.setColor(value, true)
    }
  },
  mounted () {

    this.colorPicker = createPicker(this.$el.querySelector('#colorPicker'), {
      hueBarSize: [173, 11],
      alphaBarSize: [173, 11],
      slBarSize: [255, 165]
    })

    this.colorPicker.on('change', ({color}) =>
      this.$emit('input', color)
    )

    const elements = []

    this.$el.querySelectorAll('.a-color-picker-cell').forEach(el =>
      elements.push(el)
    )

    elements.push(this.$el.querySelector('.a-color-picker-row-top'))

    elements.forEach(el =>
      el.addEventListener('mousedown', () => {
        const rootClick = () => {
          this.$emit('setCloseOnClick', true)
          this.$root.$el.removeEventListener('click', rootClick)
        }
        this.$emit('setCloseOnClick', false)
        this.$root.$el.addEventListener('click', rootClick)
      })
    )
  },
}
</script>

<style lang="scss">
.a-color-picker {
  background-color: #fff;
  border-radius: 0.2rem 0.2rem 0 0;
  box-shadow: none;

  &-row {
    padding: 1rem 1rem 0 1rem;
  }

  &-row-top {
    padding: 0;
  }

  &-transparent {
    background-repeat: repeat;
  }

  &-sl {
    border-radius: 0.1rem 0.1rem 0 0;
  }

  &-a,
  &-h,
  &-sl {
    cursor: pointer;
  }

  &-preview {
    &:hover {
      &:before {
        display: flex;
      }
    }
    &:before {
      display: none;
      content: "\F555";
      font-family: "Material Design Icons";
      position: absolute;
      top: 0;
      left: 0;
      font-size: 1rem;
      color: #fff;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 1rem;
    }
  }
}
</style>

<style lang="scss" scoped>
.color {
  width: 255px;
  color: #000;
  background-color: #fff;
  font-size: 0.8rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);

  &-values {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 0.8rem 1rem 0.6rem;
    color: #757575;
    border-bottom: 1px solid #BDBDBD;
    line-height: 1;

    .field {
      flex: 1;
      display: flex;

      > div {
        flex: 1;
        margin-right: 0.4rem;
      }
    }

    .arrows {
      width: 0.8rem;
      height: 1.2rem;
      cursor: pointer;
      margin-left: 0.4rem;

      .arrow {
        position: relative;
        background: #000;

        &:after {
          content: " ";
          border: solid transparent;
          position: absolute;
          left: 0.1rem;
          pointer-events: none;
          border-color: rgba(0, 0, 0, 0);
          border-width: 0.4rem;
          border-left-width: 0.3rem;
          border-right-width: 0.3rem;
        }

        &-top:after {
          border-bottom-color: #000;
          top: -0.3rem;
        }

        &-bottom:after {
          border-top-color: #000;
          top: 0.7rem;
        }
      }
    }

    input {
      border: 1px solid #BDBDBD;
      color: #000;
      width: 100%;
      height: 1.4rem;
      margin-bottom: 0.4rem;
      text-align: center;
    }
  }

  .swatches {
    display: flex;
    flex-wrap: wrap;
    padding: 0.32rem 0.72rem;
    max-height: 20rem;
    overflow: auto;

    ul {
      margin: 0.4rem 0;
      li {
        flex: 1;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0.2rem;

        button {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
          box-shadow: inset 0 0 0 1px rgba(14, 19, 24, 0.15);
          &.active {
            box-shadow: 0 0 0 2px #00c4cc, inset 0 0 0 2px #fff;
          }
        }
      }
    }
  }
}
</style>
