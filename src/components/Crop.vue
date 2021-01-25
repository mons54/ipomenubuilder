<template>
  <div>
    <b-modal
      v-if="element"
      :id="modalId"
      ref="modal-crop"
      title="Rogner l'image"
      @shown="activeCropImage"
      size="lg"
      no-close-on-backdrop>
      <div class="d-flex justify-content-center">
        <div
          ref="crop"
          class="crop"
          rotate="0"
          :image-item="true"
          :keep-ratio="keepRatio"
          :id="`crop-${element.id}`"
          :key="`crop-${element.id}`"
          crop>
          <div class="filter"/>
          <img
            crop-background
            :src="element.image.webformatURL"
            draggable="false"
            class="background"/>
          <div v-crop-draggable crop-inner class="inner">
            <div crop-content class="crop-content">
              <img
                crop-image
                class="crop-image"
                :src="element.image.webformatURL"
                draggable="false"/>
            </div>
            <div v-crop-resizable:top-left class="crop-resize top left"/>
            <div v-crop-resizable:top-right class="crop-resize top right"/>
            <div v-crop-resizable:bottom-right class="crop-resize bottom right"/>
            <div v-crop-resizable:bottom-left class="crop-resize bottom left"/>
          </div>
        </div>
      </div>

      <template slot="modal-footer">
        <div class="mr-auto">
          <b-form-checkbox v-model="keepRatio">
            Ratio 1:1
          </b-form-checkbox>
        </div>
        <b-button
          variant="light"
          @click="hideModalCrop">
          Annuler
        </b-button>
        <b-button
          variant="primary"
          @click="cropImage">
          Valider
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    element: null,
    modalId: {
      default: 'modal-crop',
    },
  },
  data() {
    return {
      isCrop: false,
      keepRatio: false,
    }
  },
  methods: {
    hideModalCrop() {
      this.$refs['modal-crop'].hide()
    },
    cropImage() {
      const crop = this.$refs.crop
      const inner = crop.querySelector('[crop-inner]')

      const left = parseFloat(inner.style.getPropertyValue('left')) / this.cropRatio
      const top = parseFloat(inner.style.getPropertyValue('top')) / this.cropRatio
      const width = parseFloat(inner.style.getPropertyValue('width')) / this.cropRatio
      const height = parseFloat(inner.style.getPropertyValue('height')) / this.cropRatio

      const image = new Image()
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      image.onload = async () => {
        canvas.setAttribute('width', width + 'px')
        canvas.setAttribute('height', height + 'px')
        context.drawImage(image,
          left, top,
          width, height,
          0, 0,
          width, height
        )

        this.element.image.cropped = true

        this.element.crop.left = left
        this.element.crop.top = top
        this.element.rect.width = width
        this.element.rect.height = height
      }

      image.src = this.element.image.webformatURL

      this.hideModalCrop()
    },
    activeCropImage() {
      const crop = this.$refs.crop
      const background = crop.querySelector('[crop-background]')
      const inner = crop.querySelector('[crop-inner]')
      const image = crop.querySelector('[crop-image]')

      let cropWidth = background.naturalWidth
      if (cropWidth > 800)
        cropWidth = 800

      const cropHeight = background.naturalHeight * (cropWidth / background.naturalWidth)

      crop.style.setProperty('width', cropWidth + 'px')
      crop.style.setProperty('height', cropHeight + 'px')

      this.cropRatio = cropWidth / background.naturalWidth

      const left = this.element.crop.left * this.cropRatio
      const top = this.element.crop.top * this.cropRatio
      const width = this.element.rect.width * this.cropRatio
      const height = this.element.rect.height * this.cropRatio

      inner.style.setProperty('left', left + 'px')
      inner.style.setProperty('top', top + 'px')
      inner.style.setProperty('width', width + 'px')
      inner.style.setProperty('height', height + 'px')

      image.style.setProperty('width', cropWidth + 'px')
      image.style.setProperty('height', cropHeight + 'px')
      image.style.setProperty('left', left * -1 + 'px')
      image.style.setProperty('top', top * -1 + 'px')
    },
    async getImageType(image) {
      const response = await fetch(image)
      const blob = await response.blob()
      return blob.type
    },
    async saveImage(image, canvas) {
      const type = await this.getImageType(image)
      return canvas.toDataURL(type)
    },
  }
}
</script>

<style lang="scss" scoped>
.crop {
  position: relative;
  border: 1px solid #e8eaea;

  > .filter {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }

  > .background {
    height: 100%;
    width: 100%;
  }

  > .inner {
    position: absolute;
    z-index: 2;
  }

  .crop-content {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .crop-image {
    position: absolute;
  }

  .crop-resize {
    position: absolute;
    border: 1px solid rgba(0, 0, 0, .67);
    background-color: #fff;
    width: 3px;
    height: 13px;
    box-sizing: initial;

    &:after {
      content: '';
      width: 10px;
      height: 3px;
      position: absolute;
      border: 1px solid rgba(0, 0, 0, .67);
      background-color: #fff;
      box-sizing: initial;
    }

    &.top {
      top: -3px;

      &:after {
        top: -1px;
      }

      &.left {
        cursor: nwse-resize;
      }

      &.right {
        cursor: nesw-resize;
      }
    }

    &.right {
      right: -3px;

      &:after {
        right: 3px;
        border-right: none;
      }
    }

    &.bottom {
      bottom: -3px;

      &:after {
        bottom: -1px;
      }

      &.right {
        cursor: nwse-resize;
      }

      &.left {
        cursor: nesw-resize;
      }
    }

    &.left {
      left: -3px;

      &:after {
        left: 3px;
        border-left: none;
      }
    }
  }
}
</style>
