import Vue from 'vue'
import { getAreas } from '@/helpers/grid'

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
    areas () {
      return this.page.areas
    },
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
        padding: `${this.bleed}px`,
        background: '#607D8B',
        width: `${this.width}px`,
        height: `${this.height}px`,
        position: 'relative',
        ...this.menu.styles.page,
      }
    },
    stylePageContent() {
      return {
        display: 'flex',
        width: '100%',
        height: '100%',
      }
    },
  },
  methods: {
    gridAreas (grid) {
      const areas = getAreas(grid.gridTemplateAreas)
      areas.sort((a, b) => {
        if (b === 'main')
          return -1
        if (a === 'main')
          return
        if (a === 'title')
          return -1
        if (b === 'title')
          return
        return b > a ? -1 : 1
      })
      return areas
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
    styleGridArea (area, name, index) {
      return {
        position: 'relative',
        backgroundColor: area.colors[index],
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
    styleElement(rect) {
      return {
        position: 'absolute',
        width: 'fit-content',
        transform: `translate(${rect.left}px, ${rect.top}px)`,
      }
    },
    styleElementText(element) {
      return {
        width: `${element.width}px`,
        transform: `scale(${element.scale.x}, ${element.scale.y})`,
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
        ...value.grid.template,
      }
    },
    styleElementDishName(value) {
      return {
        ...value.styleName,
        ...value.grid.name,
        gridArea: 'name',
      }
    },
    styleElementDishDescription(value) {
      return {
        ...value.styleDescription,
        ...value.grid.description,
        gridArea: 'description',

      }
    },
    styleElementDishPrice(value) {
      return {
        ...value.stylePrice,
        ...value.grid.price,
        gridArea: 'price',
      }
    },
    styleElementImage(value) {
      return {
        width: `${value.width}px`,
        height: `${value.height}px`,
        overflow: 'hidden',
      }
    },
    styleElementImageContent(value) {
      return {
        width: `${value.size.width}px`,
        height: `${value.size.height}px`,
        transform: `translate(-${value.size.left}px, -${value.size.top}px)`,
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
