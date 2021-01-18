const state = () => ({
  type: null,
  show: false,
})

const getters = {}

const actions = {}

const mutations = {
  setShowContextMenu(state, value) {
    state.show = value
  },
  setContextMenuType(state, value) {
    state.type = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
