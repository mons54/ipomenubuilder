<template>
  <div :style="styleDocument">
    <Page
      :format="format"
      :menu="menu"
      :page="page"
      :translation="translation"
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
    translation: String,
    scale: {
      type: Number,
      default: 1,
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
