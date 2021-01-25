<template>
  <div
    v-on:focus="onFocus"
    v-on:blur="onBlur"
    v-on:input="onInput"
    v-on:keypress="onKeypress($event)"
    v-on:paste="onPaste($event)"
    v-html="data"
    :class="{'active': active}"
    :style="style"
    :contenteditable="contenteditable"
    class="notranslate"
    spellcheck="false"
  />
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { priceFormat, priceValidator } from '@/helpers/price.js'

export default {
  props: {
    value: String,
    id: String,
    inline: {
      type: Boolean,
      default: false
    },
    price: {
      type: Boolean,
      default: false
    },
    contenteditable: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      active: false,
      content: null,
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
    }),
    data() {
      if (this.content)
        return this.content
      return this.value
    },
    style() {
      const style = {}

      if (this.inline)
        style.display = 'inline'

      return style
    }
  },
  methods: {
    ...mapActions('history', [
      'addHistory',
    ]),
    ...mapMutations('history', [
      'breakHistory',
    ]),
    onFocus () {
      this.content = this.$el.innerHTML
      this.active = true
    },
    onBlur () {
      if (this.price) {
        const price = priceFormat(
          this.$el.innerHTML,
          this.menu.prices
        )
        if (price !== this.$el.innerHTML)
          this.$emit('input', price)
      }

      document.getSelection().empty()

      if (this.content !== this.$el.innerHTML)
        this.addHistory()

      this.active = false
      this.content = null
    },
    onInput () {
      let value = this.$el.innerHTML
      if (this.price) {
        const newValue = priceValidator(value, this.menu.prices)
        if (value !== newValue) {
          if (newValue) {
            let selection = document.getSelection()
            const offset = selection.focusOffset - (value.length - newValue.length)
            this.$el.innerHTML = newValue
            selection.collapse(this.$el.firstChild, offset)
          } else {
            this.$el.innerHTML = newValue
            this.$el.focus()
          }
          value = newValue
        }
      }

      this.breakHistory()
      this.$emit('input', value)
    },
    onKeypress (e) {
      if (this.inline && e.which === 13)
        e.preventDefault()
    },
    onPaste (e) {
      e.preventDefault()
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')
      document.execCommand('insertHTML', false, text)
    },
  },
}
</script>

<style lang="scss" scoped>
[contenteditable="true"] {
  cursor: text;
}
</style>
