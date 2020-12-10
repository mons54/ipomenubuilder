const state = () => ({
  actived: null,
  clicked: null,
})

const getters = {}

const actions = {}

const mutations = {
  clickElement(state, value) {
    state.clicked = value
    if (state.actived !== state.clicked)
      state.actived = null
  },
  activeElement(state, value) {
    if (state.clicked === value)
      state.actived = value
  },
  desactiveElement(state) {
    state.clicked = null
    state.actived = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
