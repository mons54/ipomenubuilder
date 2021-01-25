<template>
  <div class="icons">
    <div
      v-for="(icon, ii) of icons"
      :key="ii"
      v-draggable.clone="{
        type: 'icon',
        ...icon,
        width: 62,
        scale: {
          x: 2,
          y: 2,
        },
        style: {},
      }"
      @dragstart="dragstart"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @dragend="dragend"
      class="icon">
      <img :src="icon.src">
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      icons: state => state.icon.data,
      scale: state => state.scale.value,
    }),
  },
  methods: {
    ...mapActions('icon', [
      'getIconData',
    ]),
    dragstart(event) {
      const el = event.el.firstChild
      el.style.transformOrigin = `top left`
      el.style.transform = `scale(1)`
      el.style.width = `${event.value.width}px`
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(${this.scale * 2})`
    },
    dragleave(event) {
      event.el.firstChild.style.transform = `scale(1)`
    },
    dragend(event) {
      event.el.firstChild.style.removeProperty('transform')
    },
  },
  created() {
    this.getIconData()
  },
}
</script>

<style lang="scss" scoped>
.icons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 20px;
  column-gap: 20px;
  .icon {
    width: 48px;
    img {
      width: 100%;
    }
  }
}
</style>
