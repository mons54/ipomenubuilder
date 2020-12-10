<template>
  <div class="font-style">
    <FontSize
      v-model="value.fontSize"
    />
    <InputColor
      v-model="value.color"
      class="color input-color"
      size="sm"
    />
    <b-button-group size="sm">
      <b-button
        v-on:click="fontWeight"
        :class="{'active': value.fontWeight === 'bold' }"
        title="Gras">
        <b-icon icon="type-bold" aria-hidden="true"></b-icon>
      </b-button>
      <b-button
        v-on:click="fontStyle"
        :class="{'active': value.fontStyle === 'italic' }"
        title="Italique">
        <b-icon icon="type-italic" aria-hidden="true"></b-icon>
      </b-button>
      <b-button
        v-on:click="textDecoration"
        :class="{'active': value.textDecoration === 'underline' }"
        title="Souligné">
        <b-icon icon="type-underline" aria-hidden="true"></b-icon>
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
import FontSize from '@/components/FontSize'
import InputColor from '@/components/InputColor'

export default {
  props: {
    value: Object,
  },
  components: {
    FontSize,
    InputColor,
  },
  methods: {
    fontWeight() {
      this.$emit('fontWeight', this.value.fontWeight === 'bold' ? 'normal' : 'bold')
    },
    fontStyle() {
      this.$emit('fontStyle', this.value.fontStyle === 'italic' ? 'normal' : 'italic')
    },
    textDecoration() {
      this.$emit('textDecoration', this.value.textDecoration === 'underline' ? 'none' : 'underline')
    },
  },
}
</script>

<style lang="scss" scoped>
.font-style {
  display: flex;
  align-items: center;
  > * {
    margin-left: 8px;
  }
  > :first-child {
    margin-left: 0;
  }
  .color {
    flex: 0 0 28%;
  }
}
</style>
