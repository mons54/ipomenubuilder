<template>
  <div class="dishes">
    <div
      v-for="(value, key) in dishes"
      v-draggable.clone="{
        type: 'dish',
        ...value,
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
          :style="value.styleItem"
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
import { mapGetters } from 'vuex'
import { dishes } from '@/helpers/dish'

export default {
  data() {
    return {
      dishes,
    }
  },
  computed: {
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
      event.el.firstChild.style.transform = `scale(0.75)`
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(1)`
    },
    dragleave(event) {
      event.el.firstChild.style.transform = `scale(0.75)`
    },
    dragend(event) {
      event.el.firstChild.style.removeProperty('width')
      event.el.firstChild.style.transform = `scale(1)`
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
