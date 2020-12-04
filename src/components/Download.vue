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
        <div class="size">
          {{ imageWidth }} x {{ imageHeight }} px ({{ imageWidthMm }} x {{ imageHeightMm }} mm)
        </div>
      </div>
      <b-row>
        <b-col sm="12">
          <b-button
            @click="download"
            variant="success"
            class="w-100 mt-3">
            Télécharger
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-nav-dropdown>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import download from 'js-file-download'
import Image from '@/components/Image'
import Page from '@/components/Page'
import { mapState } from 'vuex'
import { pxToMm } from '@/helpers/format'
import { getFontsLink } from '@/helpers/font'

function getFonts (html) {
  return getFontsLink([...html.matchAll(
    /font-family:\s?(?:&quot;)?([\w ]+)(?:&quot;)?/g
  )], 1)
}

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
    imageWidthMm () {
      return Math.round(pxToMm(this.format.width * this.scale))
    },
    imageHeightMm () {
      return Math.round(pxToMm(this.format.height * this.scale))
    },
    imageWidth () {
      return Math.round(this.format.width * this.scale)
    },
    imageHeight () {
      return Math.round(this.format.height * this.scale)
    },
  },
  methods: {
    download () {

      let data
      let path
      let ext = this.type

      if (this.type === 'pdf') {
        data = this.pdf()
        path = '/pdf'
      } else {
        data = this.image()
        path = `/image/${this.type}`
      }

      axios({
        url: `${process.env.VUE_APP_NODE_URL}/download${path}`,
        method: 'POST',
        responseType: 'blob',
        data,
      }).
      then(({data, headers}) => {
        if (headers['content-type'] === 'application/zip')
          ext = 'zip'
        download(data, `${this.menu.name}.${ext}`)
      })
    },
    pdf () {

      const pages = []

      this.menu.pages.forEach(page => {

        const component = new Vue({
          ...Page,
          propsData: {
            page,
            format: this.format,
            menu: this.menu,
            mark: this.mark,
          }
        }).$mount()

        const html = component.$el.outerHTML
        const fonts = getFonts(html)

        pages.push({
          html,
          fonts,
        })

        component.$destroy()
      })

      return {
        width: this.format.width,
        height: this.format.height,
        bleed: this.format.bleed,
        mark: this.mark,
        pages,
      }
    },
    image () {

      const images = []

      this.menu.pages.forEach(page => {

        const component = new Vue({
          ...Image,
          propsData: {
            page,
            format: this.format,
            menu: this.menu,
            scale: this.scale,
          }
        }).$mount()

        const html = component.$el.outerHTML
        const fonts = getFonts(html)

        images.push({
          html,
          fonts,
        })

        component.$destroy()
      })

      return {
        width: this.imageWidth,
        height: this.imageHeight,
        bleed: this.format.bleed * this.scale,
        images,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.download {
  width: 300px;
  padding: 20px;
  .size {
    font-size: 0.9rem;
  }
}
</style>
