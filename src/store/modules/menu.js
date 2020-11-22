import menu from '@/api/menu'
import { defaultColors } from '@/helpers/color'
import { grids } from '@/helpers/grid'

const state = () => ({
  id: null,
  matrix: false,
  data: null,
  onSave: false,
  saved: true,
  page: 0,
  area: 0,
  scale: 1,
})

const getters = {
  page(state) {
    let page = state.data.pages[state.page]
    if (!page)
      page = state.data.pages[0]
    return page
  },
  area(state, getters) {
    let area = getters.page.areas[state.area]
    if (!area)
      area = getters.page.areas[0]
    return area
  }
}

const actions = {
  async getMenuData({ commit }) {

    const { data } = await menu.getOne()

    commit('setMenuData', data.menu)

    return data
  },
  resizeMenu({ state }, format) {
    if (state.data.format.area !== format.area) {

      state.data.pages.forEach((page, i) => {

        // Remove use less area
        page.areas.splice(format.area)


        let size = i % 2 ? format.outside : format.inside

        size.forEach((width, i) => {
          if (!page.areas[i]) {
            page.areas.push({
              width,
              colors: defaultColors[0],
              grid: grids[0],
            })
          } else {
            page.areas[i].width = width
          }
        })
      })
    }

    state.data.format = format
  },
}

const mutations = {
  setMenuData(state, data) {
    state.data = data
  },
  setMenuArea(state, index) {
    state.area = index
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
