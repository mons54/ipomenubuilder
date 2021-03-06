import Vue from 'vue'
import { getAreasSorted } from '@/helpers/grid'

function imageArea (el, { value }, vnode) {
  if (!value.size)
    return
  let backgroundSize
  const rect = el.parentNode.getBoundingClientRect()
  const ratio = rect.width / value.width
  if (rect.height > ratio * value.height)
    backgroundSize = `auto ${value.size}%`
  else
    backgroundSize = `${value.size}% auto`
  if (backgroundSize !== value.backgroundSize) {
    vnode.context.$store.commit('history/breakHistory')
    Vue.set(value, 'backgroundSize', backgroundSize)
  }
}

export default {
  computed: {
    bleed () {
      return this.format.bleed
    },
    width () {
      return this.format.width + this.bleed * 2
    },
    height () {
      return this.format.height + this.bleed * 2
    },
    stylePage () {
      return {
        background: '#607D8B',
        width: `${this.width}px`,
        height: `${this.height}px`,
        position: 'relative',
        overflow: 'hidden',
        ...this.menu.styles.page,
      }
    },
    styleImage() {
      return {
        width: '100%',
        height: '100%',
      }
    },
  },
  methods: {
    areas(areas) {

      areas = JSON.parse(JSON.stringify(areas))

      areas.forEach((area, i) => {
        if (i === 0 || i === areas.length - 1)
          areas[i].width += this.bleed
      })
      return areas
    },
    gridAreas (grid) {
      return getAreasSorted(grid.gridTemplateAreas)
    },
    stylePageContent(pi) {
      let backgroundImage
      if (this.menu.background) {
        if (pi === 0)
          backgroundImage = `url(${this.menu.background.recto})`
        else
          backgroundImage = `url(${this.menu.background.verso})`
      }
      return {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundImage,
      }
    },
    styleArea(area) {
      return {
        width: `${area.width}px`
      }
    },
    styleGrid (grid) {
      return {
        ...grid,
        display: 'grid',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }
    },
    styleGridArea (colors, area, name, index) {
      let backgroundColor = colors[index]
      if (area.areas[name] && area.areas[name].color)
        backgroundColor = area.areas[name].color
      if (!backgroundColor)
        backgroundColor = colors[0]
      return {
        position: 'relative',
        backgroundColor,
        gridArea: name,
        overflow: 'hidden',
      }
    },
    styleImageArea (image) {

      const style = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${image.fullHDURL})`,
        backgroundRepeat: 'no-repeat',
        transform: '',
      }

      if (!isNaN(image.positionX))
        style.backgroundPositionX = `${image.positionX}%`
      else
        style.backgroundPositionX = 'center'

      if (!isNaN(image.positionY))
        style.backgroundPositionY = `${image.positionY}%`
      else
        style.backgroundPositionY = 'center'

      if (image.backgroundSize)
        style.backgroundSize = image.backgroundSize
      else
        style.backgroundSize = 'contain'

      if (image.flipHorizontal)
        style.transform += 'scaleX(-1)'
      if (image.flipVertical)
        style.transform += 'scaleY(-1)'

      if (image.filter)
        style.filter = image.filter

      return style
    },
    styleElement({ rect, position }) {
      const bleed = this.format.bleed - this.bleed
      return {
        position: 'absolute',
        width: 'fit-content',
        transform: `translate(${rect.left - bleed}px, ${rect.top - bleed}px)`,
        zIndex: position + 9,
      }
    },
    styleElementDish(value) {
      return {
        width: `${value.rect.width}px`,
      }
    },
    styleElementDishItem(value) {
      return {
        ...value.styleItem,
      }
    },
    styleElementDishItemGrid(value) {
      return {
        ...value.grid.template,
      }
    },
    styleElementDishName(value) {
      return {
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'wrap',
        columnGap: '8px',
        ...value.styleName,
        ...value.grid.name,
      }
    },
    styleElementDishAllergens() {
      return {
        display: 'flex',
        columnGap: '6px',
      }
    },
    styleElementDishAllergen(value) {
      return {
        display: 'flex',
        height: '100%',
        ...value.styleAllergen,
      }
    },
    styleElementDishDescription(value) {
      return {
        ...value.styleDescription,
        ...value.grid.description,
      }
    },
    styleElementDishDescriptionTranslation() {
      return {
        fontStyle: 'italic',
      }
    },
    styleElementDishPrices(value) {
      return {
        display: 'flex',
        ...value.grid.prices,
        ...value.stylePrice,
      }
    },
    styleElementDishPrice(value) {
      return {
        ...value.grid.price,
        width: `${value.priceWidth}px`,
      }
    },
    styleElementImage(value) {
      return {
        width: `${value.rect.width}px`,
        height: `${value.rect.height}px`,
        transform: `scale(${value.scale.x}, ${value.scale.y})`,
        overflow: 'hidden',
        borderWidth: 0,
        borderStyle: 'solid',
        ...value.style,
      }
    },
    styleElementImageContent(value) {
      return {
        width: `${value.size.width}px`,
        height: `${value.size.height}px`,
        transform: `translate(-${value.crop.left}px, -${value.crop.top}px)`,
      }
    },
    styleElementIcon(value) {
      return {
        width: `${value.width}px`,
        transform: `scale(${value.scale.x}, ${value.scale.y})`,
      }
    },
    styleElementShape(value) {
      return {
        width: `${value.width}px`,
        height: `${value.height}px`,
        transform: `scale(${value.scale.x}, ${value.scale.y})`,
      }
    },
    styleElementText(value) {
      return {
        width: `${value.width}px`,
        transform: `scale(${value.scale.x}, ${value.scale.y})`,
        wordBreak: 'break-word',
        ...value.style,
      }
    },
  },
  directives: {
    imageArea: {
      componentUpdated: imageArea,
      inserted: imageArea,
    },
  },
}
