import { defaultColors } from '@/helpers/color'
import { formats } from '@/helpers/format'
import { grids } from '@/helpers/grid'

const colors = defaultColors[0]
const format = formats[1]
const grid = grids[0]

const page = {
  elements: [],
  areas: [],
}

format.inside.forEach(width => {
  page.areas.push({
    width,
    colors,
    grid,
  })
})

export const menu = {
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
  styles: {

  },
  pages: [page],
}
