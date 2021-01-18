const state = () => ({
  type: null,
  dish: null,
  show: false,
})

const getters = {}

const actions = {}

const mutations = {
  setShowContextMenu(state, value) {
    state.show = value
  },
  setContextMenuDish(state, value) {
    state.dish = value
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
