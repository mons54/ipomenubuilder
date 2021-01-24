<template>
  <div class="dishes">
    <div
      v-for="(value, key) in dishes"
      v-draggable.clone="{
        type: 'dish',
        ...getValue(value),
        rect: {
          width
        },
      }"
      @dragstart="dragstart"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @dragend="dragend"
      :key="key"
      class="dish">
      <div>
        <div
          v-for="(item, index) in value.items"
          :key="index"
          :style="{
            ...value.styleItem,
            ...value.grid.template,
          }"
          class="item">
          <div :style="value.styleName">
            {{ item.name}}
          </div>
          <div :style="value.styleDescription">
            {{ item.description }}
          </div>
          <div :style="value.stylePrice">
            {{ item.prices[0] }} €
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { dishes } from '@/helpers/dish'

export default {
  data() {
    return {
      dishes,
    }
  },
  computed: {
    ...mapState({
      scale: state => state.scale.value,
      translation: state => state.menu.data.translate.translation,
    }),
    ...mapGetters('menu', [
      'page',
    ]),
    width() {
      return this.page.areas[0].width - 40
    },
  },
  methods: {
    dragstart(event) {
      event.el.firstChild.style.width = `${this.width}px`
      event.el.firstChild.style.transformOrigin = `top left`
      event.el.firstChild.style.transform = `scale(0.75)`
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(${this.scale})`
    },
    dragleave(event) {
      event.el.firstChild.style.transform = `scale(0.75)`
    },
    dragend(event) {
      event.el.firstChild.style.removeProperty('width')
      event.el.firstChild.style.transform = `scale(1)`
    },
    getValue(value) {
      this.translation.forEach(language => {
        value.items.forEach(item => {
          item.translationName[language] = item.name
          item.translationDescription[language] = item.description
        })
      })
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.dishes {
  .dish {
    background-color: #263238;
    border-radius: 4px;
    align-items: center;
    width: 100%;
    overflow: hidden;
    padding: 16px;
  }
}
</style>
