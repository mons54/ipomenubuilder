<template>
  <div
    class="texts">
    <div
      v-for="(value, ti) in texts"
      v-draggable.clone="{
        type: 'text',
        ...getValue(value),
        scale: {
          x: 1,
          y: 1,
        },
      }"
      @dragstart="dragstart"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @dragend="dragend"
      :key="ti"
      class="text">
      <div
        v-html="value.html"
        :style="value.style"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      texts: state => state.text.data,
      scale: state => state.scale.value,
      translation: state => state.menu.data.translate.translation,
    }),
  },
  methods: {
    dragstart(event) {
      event.el.firstChild.style.transformOrigin = `top left`
      event.el.firstChild.style.transform = `scale(0.5)`
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(${this.scale})`
    },
    dragleave(event) {
      event.el.firstChild.style.transform = `scale(0.5)`
    },
    dragend(event) {
      event.el.firstChild.style.transform = `scale(1)`
    },
    getValue(value) {
      this.translation.forEach(language => {
        value.elements.forEach(item => {
          item.translation[language] = item.value
        })
      })
      return value
    },
  },
}
</script>

<style lang="scss" scoped>
.texts {
  .text {
    background-color: #263238;
    border-radius: 4px;
    width: 100%;
    overflow: hidden;
    margin-bottom: 8px;
    padding: 16px 0;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
