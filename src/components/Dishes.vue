<template>
  <div class="dishes">
    <div
      v-for="(value, key) in dishes"
      :key="key"
      class="dish">
      <div
        v-for="(item, index) in value.items"
        :key="index"
        :style="value.styleItem"
        class="item">
        <div :style="value.styleName">
          {{ item.name}}
        </div>
        <div :style="value.styleDescription">
          {{ item.description }}
        </div>
        <div :style="value.stylePrice">
          {{ item.prices[0] }} €
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dishes } from '@/helpers/dish'

export default {
  data() {
    return {
      dishes,
    }
  }
}
</script>

<style lang="scss" scoped>
.dish {
  background-color: #263238;
  border-radius: 4px;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 16px;
}
</style>
