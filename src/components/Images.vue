<template>
  <div id="images">
    <div class="images-search">
      <b-form-input
        v-model="searchModel"
        @change="searchImages"
        class="mt-3"
        placeholder="Rechercher..."
      />
    </div>
    <div
      class="images-content"
      ref="images">
      <div>
        <div
          v-for="(value) of render"
          class="image"
          :key="value.image.previewUrl"
          :style="value.style">
          <div
            v-if="draggable"
            v-draggable.clone="{
              type: 'image',
              ...value,
              size: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                width: value.image.webformatWidth,
                height: value.image.webformatHeight,
              },
              rect: {
                width: value.image.webformatWidth,
                height: value.image.webformatHeight,
              },
              style: {},
            }"
            @dragstart="dragstart"
            @dragenter="dragenter"
            @dragleave="dragleave"
            @dragend="dragend">
            <img :src="value.image.previewURL">
          </div>
          <div
            v-else
            @click="$emit('input', value.image)">
            <img :src="value.image.previewURL"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  props: {
    value: String,
    draggable: Boolean,
  },
  computed: {
    ...mapState({
      images: state => state.image.images,
      render: state => state.image.render,
      search: state => state.image.search,
    }),
    searchModel: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    },
  },
  data() {
    return {
      defaultHeight: 120,
    }
  },
  methods: {
    ...mapActions('image', [
      'getImageData',
    ]),
    ...mapMutations('image', [
      'setRender',
      'setSearch',
    ]),
    searchImages() {
      if (!this.search)
        return
      this.getImageData(this.search)
    },
    addImages () {
      if (this.stack.length === 1) {
        this.addImage(this.stack[0], '100%')
      } else {
        this.stack.forEach(image =>
          this.addImage(
            image,
            `${this.getWidth(image) / this.width * 100}%`,
            `${this.defaultHeight}px`
          )
        )
      }
      this.width = 0
      this.stack = []
    },
    addImage (image, width, height) {
      const style = {
        width,
      }
      if (height)
        style.height = height
      this.render.push({
        image,
        style,
      })
    },
    getWidth (data) {
      return this.defaultHeight * (data.imageWidth / data.imageHeight)
    },
    dragstart(event) {
      const el = event.el.firstChild
      const image = event.value.image
      const img = new Image;
      img.onload = () => {
        el.src = img.src
      }
      img.src = image.fullHDURL
      el.style.width = `${image.webformatWidth}px`
      el.style.transform = `scale(${image.previewWidth / image.webformatWidth})`
      el.style.transition = '0.5s ease-in-out'
      el.style.transformOrigin = 'top left'
    },
    dragenter(event) {
      event.el.firstChild.style.transform = `scale(1)`
    },
    dragleave(event) {
      const image = event.value.image
      event.el.firstChild.style.transform = `scale(${image.previewWidth / image.webformatWidth})`
    },
    dragend(event) {
      const el = event.el.firstChild
      const image = event.value.image
      el.style.removeProperty('width')
      el.style.removeProperty('transition')
      el.style.removeProperty('transform')
      el.src = image.previewURL
    },
  },
  watch: {
    images(images) {

      if (!images)
        return

      images = JSON.parse(JSON.stringify(images))

      if (this.$refs.images)
        this.$refs.images.scroll(0, 0)

      const containerWidth = this.$refs.images.offsetWidth

      this.width = 0

      this.setRender([])
      this.stack = []

      images.forEach((image, index) => {
        let width = this.getWidth(image)
        if (width >= containerWidth - 50)
          return this.addImage(image, '100%')
        if (this.width + width > containerWidth + 50) {
          const findIndex = images.slice(index).findIndex(image =>
            this.width + this.getWidth(image) <= containerWidth - 50
          )
          if (findIndex !== -1) {
            const find = images[index + findIndex]
            images.splice(index + findIndex, 1, image)
            image = find
            width = this.getWidth(image)
          } else {
            this.addImages()
          }
        }
        this.width += width
        this.stack.push(image)
        if (this.width >= containerWidth - 50)
          this.addImages()
      })
    }
  },
  created() {
    if (!this.images.length)
      this.getImageData()
  }
}
</script>

<style lang="scss" scoped>
#images {
  display: flex;
  flex-direction: column;
  height: 100%;
  .images-search {
    flex: 0;
  }
  .images-content {
    overflow: auto;
    overflow-x: hidden;
    margin: 16px -16px 0 -16px;
    padding: 0 12px;
    > div {
      display: flex;
      flex-flow: wrap;
      .image {
        padding: 0 4px 8px 4px;
        > div {
          cursor: pointer;
          width: 100%;
          height: 100%;
          background-color: #263238;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
