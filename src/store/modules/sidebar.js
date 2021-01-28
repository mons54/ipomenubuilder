const state = () => ({
  selected: 'dish',
})

const getters = {}

const actions = {
  selectSidebar: ({ commit }, value) => {
    commit('selectSidebar', value)
  },
}

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
