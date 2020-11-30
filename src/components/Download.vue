<template>
  <b-nav-dropdown
    text="Télécharger"
    right>
    <div class="download">
      <b-form-select
        v-model="type"
        :options="types"
        class="mb-3"></b-form-select>
      <div v-if="type === 'pdf'">
        <b-form-checkbox
          id="pdfMark"
          v-model="mark"
          name="pdfMark">
          Marques de coupe et fond perdu
        </b-form-checkbox>
      </div>
      <div v-else>
        <b-row>
          <b-col sm="3">
            <label for="scale">Taille</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              v-model="scale"
              id="scale"
              type="range"
              :min="0.5"
              :max="4"
              :step="0.5"/>
          </b-col>
        </b-row>
        {{ imageWidth }} x {{ imageHeight }}
      </div>
      <b-row>
        <b-col sm="12">
          <b-button variant="success" class="w-100 mt-3">Télécharger</b-button>
        </b-col>
      </b-row>
    </div>
  </b-nav-dropdown>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      type: 'pdf',
      mark: true,
      types: [{ value: 'pdf', text: 'PDF impression'}, { value: 'png', text: 'PNG web'}, { value: 'jpeg', text: 'JPEG'}],
      scale: 1,
      maxScaleSlider: 2,
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.data,
      format: state => state.menu.data.format,
    }),
    imageWidth () {
      return Math.round(this.format.width * this.scale)
    },
    imageHeight () {
      return Math.round(this.format.height * this.scale)
    },
  }
}
</script>

<style lang="scss" scoped>
.download {
  width: 300px;
  padding: 20px;
}
</style>
