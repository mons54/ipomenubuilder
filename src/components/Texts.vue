<template>
  <div
    class="texts">
    <div
      v-for="(value, ti) in texts"
      v-draggable.clone="{
        type: 'text',
        value,
      }"
      @dragStart="dragStart"
      @dragEnd="dragEnd"
      :key="ti"
      class="text">
      <div v-text-container>
        <div
          data-content
          v-text-content="value.width">
          <div
            v-for="(value, index) in value.elements"
            v-html="value.html"
            :style="value.style"
            :key="index">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

let styleContent

export default {
  computed: {
    ...mapState({
      texts: state => state.text.data,
    }),
  },
  methods: {
    dragStart(el) {
      const content = el.querySelector('[data-content]')
      styleContent = content.getAttribute('style')
      content.removeAttribute('style')
    },
    dragEnd(el) {
      el.querySelector('[data-content]').setAttribute('style', styleContent)
    },
  },
  directives: {
    textContainer: {
      inserted (el) {
        const rect = el.getBoundingClientRect()
        el.style.height = rect.width + 'px'
      },
    },
    textContent: {
      inserted (el, { value }) {
        const rect = el.parentElement.getBoundingClientRect()
        el.style.transform = `scale(${rect.width / value})`
        el.style.width = `${value}px`
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.texts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  .text {
    background-color: #263238;
    border-radius: 4px;
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    > div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
