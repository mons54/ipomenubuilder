import allergen from '@/api/allergen.js'

const state = () => ({
  data: [],
})

const getters = {}

const actions = {
  async getAllergenData({ commit, state }) {
    if (!state.data.length) {
      const { data } = await allergen.getAll()
      commit('setAllergenData', data.allergens)
    }
    return state.data
  }
}

const mutations = {
  setAllergenData(state, data) {
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
