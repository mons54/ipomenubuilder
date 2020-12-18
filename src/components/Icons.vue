<template>
  <div class="icons">
    <div
      v-for="(icon, ii) of icons"
      :key="ii"
      v-icon
      v-html="icon.src"
      v-draggable.clone="{
        type: 'icon',
        ...icon,
        scale: {
          x: 4,
          y: 4,
        },
        style: {},
      }"
      @dragstart="dragstart"
      @dragenter="dragenter"
      @dragleave="dragleave"
      @dragend="dragend"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      icons: state => state.icon.data,
    }),
  },
  methods: {
    ...mapActions('icon', [
      'getIconData',
    ]),
    dragstart(event) {
      const el = event.el.firstChild
      el.style.transform = `scale(1)`
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(4)`
    },
    dragleave(event) {
      event.el.firstChild.style.transform = `scale(1)`
    },
    dragend(event) {
      const el = event.el.firstChild
      el.style.removeProperty('transform')
    },
  },
  directives: {
    icon: {
      inserted (el) {
        const rect = el.getBoundingClientRect()
        el.style.width = rect.width + 'px'
        el.style.height = rect.height + 'px'
      },
    }
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
}
</style>
