<template>
  <div class="style-shape">
    <b-row class="mt-4">
      <b-col md="4">
        <label for="color">Couleur</label>
      </b-col>
      <b-col md="8">
        <InputColor
          v-model="element.shape.color"
          class="color input-color"
          size="sm"
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="4">
        <label for="color">Bordure</label>
      </b-col>
      <b-col md="8" class="d-flex">
        <InputNumber
          v-model="element.shape.borderWidth"
          size="sm"
          autocomplete="off"
          class="mr-2"
          :min="0"
        />
        <InputColor
          v-model="element.shape.borderColor"
          class="color input-color"
          size="sm"
        />
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col md="4">
        <label for="color">Ombre</label>
      </b-col>
      <b-col md="8" class="d-flex">
        <InputNumber
          v-model="element.shape.boxShadowWidth"
          size="sm"
          autocomplete="off"
          class="mr-2"
          :min="0"
        />
        <InputColor
          v-model="element.shape.boxShadowColor"
          class="color input-color"
          size="sm"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InputColor from '@/components/InputColor'
import InputNumber from '@/components/InputNumber'

export default {
  props: {
    element: Object,
  },
  components: {
    InputColor,
    InputNumber,
  },
}
</script>
