import { defaultColors } from '@/helpers/color'
import { formats } from '@/helpers/format'
import { grids } from '@/helpers/grid'

const color = defaultColors[0]
const format = formats[2]
const grid = grids[0]

const page = {
  elements: [],
  areas: [],
}

format.inside.forEach(width => {
  page.areas.push({
    width,
    color,
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
