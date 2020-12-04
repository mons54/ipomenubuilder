<template>
  <div :style="styleDocument">
    <Page
      :format="format"
      :menu="menu"
      :page="page"
    />
  </div>
</template>

<script>
import Page from '@/components/Page'

export default {
  components: {
    Page,
  },
  props: {
    format: Object,
    menu: Object,
    page: Object,
    scale: {
      type: String,
      default: '1',
    },
  },
  computed: {
    styleDocument () {
      return {
        transform: `scale(${this.scale})`,
        transformOrigin: 'top left',
      }
    },
  },
}
</script>
