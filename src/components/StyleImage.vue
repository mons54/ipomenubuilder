<template>
  <div class="style-image">
    <div class="filters">
      <div
        v-for="(value, index) in filters"
        v-on:click="filter = value"
        :key="index"
        class="filter">
        <img
          :style="`filter: ${value}`"
          :src="element.image.previewURL"/>
        <b-icon-check
          v-if="value === filter"
          class="active"/>
      </div>
    </div>
    <b-row class="mt-4">
      <b-col md="4">
        <label for="textColor">{{ $t('border') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="borderWidth"
          :min="0"
          :max="50"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4">
        <label for="textColor">{{ $t('color') }}</label>
      </b-col>
      <b-col md="8">
        <InputColor
          v-model="borderColor"
          size="sm"
        />
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col md="4">
        <label for="textColor">{{ $t('borderRadius') }}</label>
      </b-col>
      <b-col md="8">
        <InputRange
          v-model="borderRadius"
          :min="0"
          :max="200"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import InputColor from '@/components/InputColor'
import InputRange from '@/components/InputRange'

export default {
  props: {
    element: Object,
  },
  components: {
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
      stylePage: state => state.menu.data.styles.page,
    }),
    style() {
      return this.element.style
    },
    filter: {
      get () {
        return this.style.filter
      },
      set (value) {
        if (this.filter === value)
          Vue.delete(this.style, 'filter')
        else
          Vue.set(this.style, 'filter', value)
      }
    },
    borderWidth: {
      get () {
        return parseInt(this.style.borderWidth) || 0
      },
      set (value) {
        Vue.set(this.style, 'borderWidth', `${value}px`)
      }
    },
    borderColor: {
      get () {
        return this.style.borderColor || this.stylePage.color
      },
      set (value) {
        Vue.set(this.style, 'borderColor', value)
      }
    },
    borderRadius: {
      get () {
        return parseInt(this.style.borderRadius) || 0
      },
      set (value) {
        Vue.set(this.style, 'borderRadius', `${value}px`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
  }
}
</style>
