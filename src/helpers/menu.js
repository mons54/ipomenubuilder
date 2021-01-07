import { defaultColors } from '@/helpers/color'
import { formats } from '@/helpers/format'
import { grids } from '@/helpers/grid'

const colors = defaultColors[0]
const format = formats[2]
const grid = grids[0]

const pages = []

let page = {
  elements: [],
  areas: [],
}

format.inside.forEach(width => {
  page.areas.push({
    width,
    colors,
    grid,
    areas: {}
  })
})

pages.push(page)

if (format.area > 1) {
  page = {
    elements: [],
    areas: [],
  }
  format.outside.forEach(width => {
    page.areas.push({
      width,
      colors,
      grid,
      areas: {}
    })
  })
  pages.push(page)
}

export const menu = {
  name: "Test",
  format,
  prices: {
    symbol: "€",
    separator: ",",
    forceDecimal: true,
    decimal: 2,
    space: true
  },
  parameters: {

  },
  translate: {
    language: 'fr',
  },
  styles: {
    page: {
      color: '#fff',
    },
  },
  pages,
}
