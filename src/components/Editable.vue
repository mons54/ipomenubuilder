<template>
  <div
    v-on:focus="onFocus"
    v-on:blur="onBlur"
    v-on:input="onInput"
    v-on:keypress="onKeypress($event)"
    v-on:paste="onPaste($event)"
    v-html="data"
    :class="{'active': isActive}"
    :style="style"
    contenteditable="true"
    class="editable notranslate"
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
  },
  data () {
    return {
      isActive: false,
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
    }),
    data() {
      if (this.isActive)
        return this.$el.innerHTML
      return this.value
    },
    style() {
      const style = {}

      if (this.inline)
        style.display = 'inline'

      if (this.isActive)
        style.cursor = 'text'

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
      this.innerHTML = this.$el.innerHTML
      this.isActive = true
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
      this.isActive = false
      if (this.innerHTML !== this.$el.innerHTML)
        this.addHistory()
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

<style>
.editable {
  cursor: default;
}
</style>
