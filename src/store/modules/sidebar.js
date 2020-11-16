const state = () => ({
  selected: 'dishes',
})

const getters = {}

const actions = {}

const mutations = {
  selectSidebar: (state, value) => {
    state.selected = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
