import icon from '@/api/icon.js'

const state = () => ({
  data: [],
})

const getters = {}

const actions = {
  async getIconData({ commit, state }) {
    if (!state.data.length) {
      const { data } = await icon.getAll()
      console.log(data)
      commit('setIconData', data.icons)
    }
    return state.data
  }
}

const mutations = {
  setIconData(state, data) {
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
