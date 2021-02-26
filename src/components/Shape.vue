<template>
  <div
    class="shapes">
    <div
      v-for="(shape, key) in shapes"
      :key="key"
      class="shape">
      <div
        v-draggable.clone="{
          type: 'shape',
          shape,
          opacity: 100,
          width: 200,
          height: 200,
          scale: {
            x: 1,
            y: 1,
          },
        }"
        @dragstart="dragstart"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragend="dragend">
        <component
          v-bind:is="shape.name"
          v-bind="shape"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      shapes: [
        {
          name: 'shape-ellipse',
          color: 'rgb(155, 155, 22)',
          borderWidth: 0,
          borderColor: 'rgb(255, 255, 255)',
          borderStyle: 'solid',
          boxShadowWidth: 0,
          boxShadowColor: 'rgb(0, 0, 0)',
        },
        {
          name: 'shape-rectangle',
          color: 'rgb(230, 74, 25)',
          borderWidth: 0,
          borderColor: 'rgb(255, 255, 255)',
          borderStyle: 'solid',
          boxShadowWidth: 0,
          boxShadowColor: 'rgb(0, 0, 0)',
        },
        /*{
          name: 'shape-polygon',
          color: 'rgb(25, 118, 210)',
          sides: 6,
        },
        {
          name: 'shape-star',
          color: 'rgb(251, 192, 45)',
        },*/
      ]
    }
  },
  computed: {
    ...mapState({
      scale: state => state.scale.value,
    }),
  },
  methods: {
    dragstart(event) {
      const el = event.el.firstChild
      el.style.transformOrigin = `top left`
      el.style.width = `${event.value.width}px`
      el.style.height = `${event.value.height}px`
      el.style.transform = `scale(0.5)`
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(${this.scale})`
    },
    dragleave(event) {
      event.el.firstChild.style.transform = `scale(0.5)`
    },
    dragend(event) {
      const el = event.el.firstChild
      el.style.width = `100%`
      el.style.height = `100%`
      el.style.removeProperty('transform')
    },
  },
}
</script>

<style lang="scss" scoped>
.shapes {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 20px 40px;
  grid-row-gap: 40px;
  .shape {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: calc(100% - 16px);
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
