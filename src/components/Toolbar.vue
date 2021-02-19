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
      <b-dropdown
        id="dropdown-Position"
        text="Position"
        class="toolbar-item mr-4"
        variant="light"
        size="sm">
        <b-dropdown-item
          :disabled="!afterElement"
          @click="afterPosition">
          Avant
        </b-dropdown-item>
        <b-dropdown-item
          :disabled="!beforeElement"
          @click="beforePosition">
          Arrière
        </b-dropdown-item>
      </b-dropdown>
      <b-button
        @click="duplicateElement"
        variant="light"
        class="toolbar-item mr-2"
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
    ...mapGetters('menu', [
      'page',
    ]),
    overlap() {
      const overlap = []
      this.page.elements.forEach(item => {
        if (item.id !== this.actived.id && this.isOverlap(this.actived.id, item.id))
          overlap.push(item)
      })
      return overlap
    },
    afterElement() {
      let element
      this.overlap.forEach(item => {
        if (item.position < this.actived.position)
          return
        if (!element || element.position > item.position)
          element = item
      })
      return element
    },
    beforeElement() {
      let element
      this.overlap.forEach(item => {
        if (item.position > this.actived.position)
          return
        if (!element || element.position < item.position)
          element = item
      })
      return element
    },
  },
  methods: {
    ...mapActions('element', [
      'deleteElement',
      'duplicateElement',
    ]),
    beforePosition() {
      const position = this.actived.position
      this.actived.position = this.beforeElement.position
      this.beforeElement.position = position
    },
    afterPosition() {
      const position = this.actived.position
      this.actived.position = this.afterElement.position
      this.afterElement.position = position
    },
    isOverlap(id1, id2) {

      if (!document.getElementById(id1))
        return

      const rect1 = document.getElementById(id1).firstChild.getBoundingClientRect()
      const rect2 = document.getElementById(id2).firstChild.getBoundingClientRect()

      return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
      )
    },
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
