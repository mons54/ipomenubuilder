<template>
  <div class="borders-style">
    <div
      class="menu">
      <div
        class="menu-label"
        :class="{'open': show }"
        @click="click">
        <div
          class="border-style"
          :style="`border-style: ${style};`"/>
      </div>
      <div
        v-show="show"
        class="menu-content"
        @click="e => e.stopPropagation()">
        <div
          v-for="(value, key) in styles"
          @click="style = value"
          :key="key"
          class="item">
          <div
            class="border-style"
            :style="`border-style: ${value};`"
          />
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
      styles: ['solid', 'double', 'dashed', 'dotted', 'groove', 'ridge', 'inset'],
    }
  },
  computed: {
    style: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
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
.borders-style {
  width: 100%;
  position: relative;
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
      .border-style {
        margin: 0 8px;
        border-color: #343a40;
      }
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
      .item {
        width: 100%;
        display: flex;
        align-items: center;
        height: 40px;
        cursor: pointer;
        user-select: none;
        padding: 0 8px;
        &:hover {
          background-color: #37474f;
        }
      }
    }
  }
  .border-style {
    width: 100%;
    border-top-width: 4px;
    border-bottom-width: 0;
    border-left-width: 0;
    border-right-width: 0;
  }
}
</style>
