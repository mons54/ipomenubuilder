import defaultData from '@/helpers/defaultData'

const state = () => ({
  id: null,
  matrix: false,
  data: null,
  onSave: false,
  saved: true,
})

const getters = {}

const actions = {
  async getMenuData({ commit }) {

    commit('setMenuData', defaultData)

    return defaultData
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
