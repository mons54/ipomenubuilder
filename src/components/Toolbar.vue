<template>
  <div class="toolbar">
    <ToolbarDish
      v-if="dishActived"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ToolbarDish from '@/components/ToolbarDish'

export default {
  components: {
    ToolbarDish,
  },
  computed: {
    ...mapGetters('element', [
      'dishActived',
      'textActived',
    ])
  },
}
</script>

<style lang="scss" scoped>
.toolbar {
  width: 100%;
}
</style>
