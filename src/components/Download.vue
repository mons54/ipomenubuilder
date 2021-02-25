<template>
  <b-nav-dropdown
    :text="$t('download')"
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
          {{ $t('marksAndBleeds') }}
        </b-form-checkbox>
      </div>
      <div v-else-if="type !== 'mobile'">
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
            {{ $t('download') }}
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
      types: [
        { value: 'pdf', text: this.$t('downloadTypes.pdf') },
        { value: 'mobile', text: this.$t('downloadTypes.mobile') },
        { value: 'png', text: this.$t('downloadTypes.png') },
        { value: 'jpeg', text: this.$t('downloadTypes.jpeg') }
      ],
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
      this.downloadDocument()
      if (!this.menu.translate.inline) {
        this.menu.translate.translation.forEach(language => {
          this.downloadDocument(language)
        })
      }
    },
    downloadDocument (language) {

      let data
      let path
      let ext = this.type
      let name = this.menu.name

      if (language)
        name += `-${language}`

      if (this.type === 'pdf') {
        data = this.pdf(language)
        path = '/pdf'
      } else if (this.type === 'mobile') {
        data = this.mobile(language)
        path = '/mobile'
        ext = 'pdf'
      } else {
        data = this.image(language)
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
        download(data, `${name}.${ext}`)
      })
    },
    pdf (translation) {

      const pages = []

      this.menu.pages.forEach((page, pi) => {

        const component = new Vue({
          ...Page,
          propsData: {
            page,
            pi,
            format: this.format,
            menu: this.menu,
            mark: this.mark,
            translation,
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
    mobile (translation) {

      const pages = []

      this.menu.pages.forEach((page, pi) => {

        const component = new Vue({
          ...Page,
          propsData: {
            page,
            pi,
            format: this.format,
            menu: this.menu,
            translation,
          }
        }).$mount()

        const html = component.$el.outerHTML
        const fonts = getFonts(html)

        pages.push({
          html,
          fonts,
          areas: 1 % pi + 1 ? this.format.outside : this.format.inside,
        })

        component.$destroy()
      })

      return {
        width: this.format.width,
        height: this.format.height,
        pages,
      }
    },
    image (translation) {

      const images = []

      this.menu.pages.forEach((page, pi) => {

        const component = new Vue({
          ...Image,
          propsData: {
            page,
            pi,
            format: this.format,
            menu: this.menu,
            scale: this.scale,
            translation,
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
