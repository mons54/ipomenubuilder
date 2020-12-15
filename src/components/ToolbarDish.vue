<template>
  <div class="toolbar">
    <div class="toolbar-nav ml-auto">
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
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('element', [
      'deleteElement',
      'duplicateElement',
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/toolbar.scss';
</style>
