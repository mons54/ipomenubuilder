<template>
  <div class="toolbar">
    <div
      v-if="element"
      class="toolbar-nav ml-auto">
      <b-button
        @click="duplicateElement"
        variant="light"
        class="toolbar-item"
        size="sm">
        <b-icon-stickies/>
      </b-button >
      <b-button
        @click="deleteElement"
        variant="light"
        class="toolbar-item"
        size="sm">
        <b-icon-trash/>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      element: state => state.element.actived
    })
  },
  methods: {
    ...mapActions('element', [
      'deleteElement',
      'duplicateElement',
    ])
  },
}
</script>

<style lang="scss" scoped>
.toolbar {
  display: flex;
  width: 100%;
  &-nav {
    display: flex;
    align-items: center;
  }
}
</style>
