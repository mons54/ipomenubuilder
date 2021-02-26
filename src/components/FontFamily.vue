<template>
  <div class="font-family">
    <div class="selection">
      <b-form-input
        v-model="search"
        :placeholder="`${$t('search')}...`"
        type="search"
        size="sm"
        @click="clickSearch"
        autocomplete="off"
      />
      <div
        class="menu menu--category"
        @click="clickCategories">
        <div
          class="menu-label"
          :class="{'open': showCategories }"
          v-html="categoriesLabel">
        </div>
        <div
          v-show="showCategories"
          class="menu-content"
          @click="e => e.stopPropagation()">
          <b-form-checkbox-group
            v-model="category"
            :options="categories"
          />
        </div>
      </div>
    </div>
    <div class="menu menu-fonts">
      <div
        class="menu-label"
        @click="clickFonts"
        :class="{'open': showFonts }">
        {{ value|fontFamily }}
      </div>
      <div
        v-show="showFonts"
        class="menu-content"
        @click="e => e.stopPropagation()">
        <div
          v-if="!fonts.length"
          class="font">
          Aucun résulat
        </div>
        <div
          v-for="font in fonts"
          @click="$emit('input', font.family)"
          :key="font.family"
          class="font">
          <div
            v-font="font.family"
            class="family">
            {{ font.family|fontFamily }}
          </div>
          <div
            class="category"
            :style="`font-family: ${font.category}`">
            {{ font.category.replace('-', ' ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const loaded = []

export default {
  props: {
    value: String,
  },
  data() {
    return {
      showCategories: false,
      showFonts: false,
      category: ['serif', 'sans-serif', 'display', 'handwriting', 'monospace'],
      categories: [
        { text: this.$t('fontCategories.serif'), value: 'serif' },
        { text: this.$t('fontCategories.sans-serif'), value: 'sans-serif' },
        { text: this.$t('fontCategories.display'), value: 'display' },
        { text: this.$t('fontCategories.handwriting'), value: 'handwriting' },
        { text: this.$t('fontCategories.monospace'), value: 'monospace' },
      ],
      search: '',
    }
  },
  computed: {
    fonts() {
      return this.$fonts.get(this.category, this.search)
    },
    categoriesLabel() {

      const categories = this.categories.filter(category => this.category.includes(category.value))

      if (!categories.length)
        return this.$t('any')

      if (categories.length !== this.categories.length)
        return `${this.$t(`fontCategories.${categories[0].value}`)}+${categories.length - 1}`

      return this.$t('categories')
    },
  },
  methods: {
    clickSearch (e) {
      if (this.showFonts)
        e.stopPropagation()
      setTimeout(() => {
        this.showCategories = false
        this.showFonts = true
      })
    },
    clickCategories(e) {
      if (this.showFonts)
        e.stopPropagation()
      setTimeout(() => {
        this.showFonts = true
        this.showCategories = !this.showCategories
      })
    },
    clickFonts(e) {
      if (this.showFonts)
        e.stopPropagation()
      setTimeout(() => {
        this.showFonts = !this.showFonts
      })
    },
    hideFonts() {
      this.showFonts = false
    },
    hideCategories () {
      this.showCategories = false
    },
  },
  directives: {
    font: {
      async inserted (el, { value }) {

        function loadFontFamily(fontFamily) {
          return new Promise(resolve =>  {
            setTimeout(() => {
              resolve(fontFamily)
            })
          })
        }

        if (!loaded.includes(value))
          value = await loadFontFamily(value)
        el.style.fontFamily = value
      }
    }
  },
  filters: {
    fontFamily (value) {
      if (!value)
        return
      return value.replace(/"/g, '')
    },
  },
  watch: {
    showCategories(value) {
      document.removeEventListener('click', this.hideCategories)
      if (value)
        document.addEventListener('click', this.hideCategories)
    },
    showFonts(value) {
      document.removeEventListener('click', this.hideFonts)
      if (value) {
        document.addEventListener('click', this.hideFonts)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.font-family {
  .menu {
    position: relative;
    height: 32px;
    border: 1px solid #37474f;
    border-radius: 4px;
    background-color: #343a40;
    .menu-label {
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 12px;
      &:after {
        display: flex;
        margin-left: auto;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #fff;
        content: "";
        height: 0;
        position: relative;
        speak: none;
        width: 0;
      }
      &.open:after {
        transform: rotate(180deg);
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
    }
  }
  .selection {
    display: flex;
    margin-bottom: 8px;
    .menu {
      flex: 0 0 65%;
      margin-left: 8px;
    }
    .menu-content {
      padding: 12px;
      z-index: 10;
      width: 100%;
      overflow-x: hidden;
      user-select: none;
    }
  }
  .font {
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
    .family {
      flex: 1;
    }
    .category {
      text-transform: capitalize;
    }
  }
}
</style>
