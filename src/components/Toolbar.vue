<template>
  <div class="toolbar">
    <div
      v-if="element && element.type === 'image'"
      class="toolbar-nav">
      <b-button
        v-b-modal.modal-crop
        variant="light"
        class="toolbar-item"
        size="sm">
        <b-icon-bounding-box/>
      </b-button>
      <Crop :element="element"/>
    </div>
    <div
      v-if="element"
      class="toolbar-nav ml-auto">
      <b-button
        @click="duplicateElement"
        variant="light"
        class="toolbar-item"
        size="sm">
        <b-icon-stickies/>
      </b-button>
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
import Crop from '@/components/Crop'

export default {
  components: {
    Crop,
  },
  computed: {
    ...mapState({
      element: state => state.element.actived
    })
  },
  methods: {
    ...mapActions('element', [
      'deleteElement',
      'duplicateElement',
    ]),
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
