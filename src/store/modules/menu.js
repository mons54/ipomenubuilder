import menu from '@/api/menu'

const state = () => ({
  id: null,
  matrix: false,
  data: null,
  onSave: false,
  saved: true,
  page: 0,
  scale: 1,
})

const getters = {
  page(state) {
    return state.data.pages[state.page]
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
