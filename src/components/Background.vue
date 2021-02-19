<template lang="html">
  <div class="backgrounds">
    <div
      v-for="(value, key) in background[menu.format.ref]"
      @click="menu.background = value"
      :key="key"
      class="background">
      <img :src="value.recto" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { background } from '@/helpers/background'

export default {
  data() {
    return {
      background,
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
    }),
  },
}
</script>

<style lang="scss" scoped>
.backgrounds {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  .background {
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
