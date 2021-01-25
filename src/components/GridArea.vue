<template>
  <div id="gridArea">
    <div
      v-if="!gridArea.image">
      <InputColor
        v-model="areaColor"
        class="input-color"
        id="color0"
      />
      <hr class="mb-0"/>
      <Images
        v-model="image"/>
    </div>
    <div v-else>
      <b-row>
        <b-col md="12" class="text-center mb-4">
          <b-button
            variant="danger"
            @click="image = null">
            {{ $t('deleteImage') }}
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <label for="size">{{ $t('size') }}</label>
        </b-col>
        <b-col md="6">
          <InputRange
            v-model="size"
            id="size"
            :step="1"
            :min="100"
            :max="300"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <label for="size">{{ $t('horizontal') }}</label>
        </b-col>
        <b-col md="6">
          <InputRange
            v-model="positionX"
            id="size"
            :step="1"
            :min="0"
            :max="100"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <label for="size">{{ $t('vertical') }}</label>
        </b-col>
        <b-col md="6">
          <InputRange
            v-model="positionY"
            id="size"
            :step="1"
            :min="0"
            :max="100"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <label for="size">{{ $t('symmetry') }}</label>
        </b-col>
        <b-col md="6">
          <b-button-group
            size="sm">
            <b-button
              :pressed.sync="flipHorizontal">
              {{ $t('horizontal') }}
            </b-button>
            <b-button
              :pressed.sync="flipVertical">
              {{ $t('vertical') }}
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
      <hr/>
      <div class="filters">
        <div
          v-for="(value, index) in filters"
          v-on:click="filter = value"
          :key="index"
          :style="`backgroundColor: ${isOpacity(value) ? color : '#263238'}`"
          class="filter">
          <img
            :style="`filter: ${value}`"
            :src="image.previewURL"/>
          <b-icon-check
            v-if="value === filter"
            class="active"/>
          <InputColor
            v-if="isOpacity(value)"
            v-model="color"
            class="color-opacity"
            :disabled="value !== filter"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
import { getAreasSorted } from '@/helpers/grid'
import Images from '@/components/Images'
import InputColor from '@/components/InputColor'
import InputRange from '@/components/InputRange'

export default {
  components: {
    Images,
    InputColor,
    InputRange,
  },
  data () {
    return {
      filters: [
        'hue-rotate(45deg)',
        'saturate(0.5)',
        'brightness(0.5)',
        'sepia(1)',
        'grayscale(1)',
        'invert(1)',
        'blur(1px)',
        'contrast(0.5)',
        'opacity(0.5)',
      ],
    }
  },
  computed: {
    ...mapState({
      colors: state => state.menu.data.colors,
      gridAreaName: state => state.menu.gridArea,
    }),
    ...mapGetters('menu', [
      'area',
      'gridArea',
    ]),
    areaColor: {
      get() {
        let color = this.gridArea.color
        if (!color) {
          const areas = getAreasSorted(this.area.grid.gridTemplateAreas)
          const index = areas.findIndex(name => name === this.gridAreaName)
          color = this.colors[index]
          if (!color)
            color = this.colors[0]
        }
        return color
      },
      set(color) {
        Vue.set(this.gridArea, 'color', color)
      }
    },
    image: {
      get() {
        return this.gridArea.image
      },
      set(image) {
        this.gridArea.image = image
      }
    },
    size: {
      get () {
        if (isNaN(this.image.size))
          return 0
        return this.image.size
      },
      set (value) {
        Vue.set(this.image, 'size', value)
      },
    },
    positionX: {
      get () {
        if (isNaN(this.image.positionX))
          return 50
        return this.image.positionX
      },
      set (value) {
        Vue.set(this.image, 'positionX', value)
      },
    },
    positionY: {
      get () {
        if (isNaN(this.image.positionY))
          return 50
        return this.image.positionY
      },
      set (value) {
        Vue.set(this.image, 'positionY', value)
      },
    },
    flipHorizontal: {
      get() {
        return this.image.flipHorizontal || false
      },
      set(value) {
        Vue.set(this.image, 'flipHorizontal', value)
      },
    },
    flipVertical: {
      get() {
        return this.image.flipVertical || false
      },
      set(value) {
        Vue.set(this.image, 'flipVertical', value)
      },
    },
    color: {
      get () {
        return this.area.color
      },
      set (value) {
        Vue.set(this.area, 'color', value)
      },
    },
    filter: {
      get () {
        return this.image.filter
      },
      set (value) {
        if (this.filter === value)
          Vue.delete(this.image, 'filter')
        else
          Vue.set(this.image, 'filter', value)
      }
    },
  },
  methods: {
    isOpacity (value) {
      return value === 'opacity(0.5)'
    },
  }
}
</script>

<style lang="scss" scoped>
#gridArea {
  height: 100%;
  .filters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4px;
    row-gap: 4px;
    .filter {
      position: relative;
      display: flex;
      overflow: hidden;
      cursor: pointer;
      .active {
        position: absolute;
        left: 0;
        top: 0;
        margin: 8px;
        background-color: #263238;
        border-radius: 50%;
        color: #fff;
      }
      .color-opacity {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 8px;
        width: 40px;
      }
    }
  }
}
</style>
