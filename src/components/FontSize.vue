<template>
  <div class="font-size">
    <div
      class="menu">
      <div
        class="menu-label"
        :class="{'open': show }"
        @click="click">
        <b-form-input
          v-model="size"
          type="number"
          size="sm"
          autocomplete="off"
        />
      </div>
      <div
        v-show="show"
        class="menu-content"
        @click="e => e.stopPropagation()">
        <div
          v-for="value in sizes"
          @click="size = value"
          :key="value"
          class="size">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
  },
  data () {
    return {
      show: false,
      search: '',
      min: 6,
      sizes: [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96, 104, 120],
    }
  },
  computed: {
    size: {
      get() {
        return parseInt(this.value)
      },
      set(value) {
        value = parseInt(value)
        if (isNaN(value) || value < this. min)
          return
        this.$emit('input', `${value}px`)
      }
    },
  },
  methods: {
    click(e) {
      if (this.show)
        e.stopPropagation()
      setTimeout(() => {
        this.show = true
      })
    },
    hide() {
      this.show = false
    },
  },
  watch: {
    show(value) {
      document.removeEventListener('click', this.hide)
      if (value)
        document.addEventListener('click', this.hide)
    },
  },
}
</script>

<style lang="scss" scoped>
.font-size {
  .menu {
    position: relative;
    height: 32px;
    border: 1px solid #37474f;
    border-radius: 4px;
    background-color: #fff;
    .menu-label {
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
    }
    .menu-content {
      position: absolute;
      background-color: #343a40;
      max-height: 300px;
      border: 1px solid #37474f;
      border-radius: 4px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
      z-index: 9;
    }
  }
  .size {
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    cursor: pointer;
    user-select: none;
    padding: 0 12px;
    &:hover {
      background-color: #37474f;
    }
  }
}
</style>
