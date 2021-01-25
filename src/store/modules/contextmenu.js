const state = () => ({
  show: false,
})

const getters = {}

const actions = {}

const mutations = {
  setShowContextMenu(state, value) {
    state.show = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
