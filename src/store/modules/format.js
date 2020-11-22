import format from '@/api/format.js'

const state = () => ({
  data: [],
})

const getters = {}

const actions = {
  async getFormatData({ commit, state }) {
    if (!state.data.length) {
      const { data } = await format.getAll()
      commit('setFormatData', data.formats)
    }
    return state.data
  },
}

const mutations = {
  setFormatData(state, data) {
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
