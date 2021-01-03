const state = () => ({
  value: 1,
})

const getters = {}

const actions = {}

const mutations = {
  setScale(state, scale) {
    state.value = scale
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
