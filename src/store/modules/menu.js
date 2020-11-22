import menu from '@/api/menu'

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
}

const mutations = {
  setMenuData(state, data) {
    state.data = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
