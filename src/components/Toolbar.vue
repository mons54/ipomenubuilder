<template>
  <div class="toolbar">
    <div
      v-if="actived && actived.type === 'image'"
      class="toolbar-nav">
      <b-button
        v-b-modal.modal-crop
        variant="light"
        class="toolbar-item"
        size="sm">
        <b-icon-bounding-box/>
      </b-button>
      <Crop :element="actived"/>
    </div>
    <div
      v-if="actived"
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
import { mapActions, mapGetters } from 'vuex'
import Crop from '@/components/Crop'

export default {
  components: {
    Crop,
  },
  computed: {
    ...mapGetters('element', [
      'actived',
    ]),
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
