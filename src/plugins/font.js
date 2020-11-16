import font from '@/api/font.js'
import { getFontsLink } from '@/helpers/font.js'

export default {

  async install (Vue) {

    const { data } = await font.getAll()

    const meta = document.createElement('link')
    meta.setAttribute('rel', 'stylesheet')
    meta.setAttribute('href', `${getFontsLink(data.items, 'family')}`)
    document.head.appendChild(meta)

    Vue.prototype.$fonts = {
      get (filters = [], search = '') {
        const regex = new RegExp(search, 'i')
        const fonts = []
        data.items.forEach(font => {
          if (
            (search && font.family.search(regex) === -1) ||
            !filters.includes(font.category)
          ) return
          fonts.push({
            category: font.category,
            family: `"${font.family}"`,
          })
        })
        return fonts
      }
    }
  }
}
