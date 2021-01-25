import { defaultColors } from '@/helpers/color'
import { formats } from '@/helpers/format'
import { grids } from '@/helpers/grid'

export function addPage({ pages, format }, position = 0) {

  const grid = grids[0]

  const page = {
    elements: [],
    areas: [],
  }

  format.inside.forEach(width => {
    page.areas.push({
      width,
      grid,
      areas: {}
    })
  })

  pages.splice(position, 0, page)

  if (format.area > 1) {
    position++
    const verso = {
      elements: [],
      areas: [],
    }
    format.outside.forEach(width => {
      verso.areas.push({
        width,
        grid,
        areas: {}
      })
    })
    pages.splice(position, 0, verso)
  }
}

const colors = defaultColors[0]
const format = formats[2]

const pages = []

addPage({ pages, format })

export const menu = {
  name: "Test",
  colors,
  format,
  prices: {
    symbol: "€",
    separator: ",",
    forceDecimal: true,
    decimal: 2,
    space: true
  },
  parameters: {},
  translate: {
    language: 'fr',
    inline: false,
    dishName: false,
    textes: false,
    translation: [],
  },
  styles: {
    page: {
      color: '#fff',
    },
  },
  pages,
}
