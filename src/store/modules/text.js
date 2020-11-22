import text from '@/api/text.js'

const state = () => ({
  data: [],
})

const getters = {}

const actions = {
  async getTextData({ commit, state }) {
    if (!state.data.length) {
      const { data } = await text.getAll()
      commit('setTextData', data.texts)
    }
    return state.data
  },
}

const mutations = {
  setTextData(state, data) {
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
