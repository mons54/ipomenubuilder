const state = () => ({
  selected: 'dishes',
})

const getters = {}

const actions = {
  selectSidebar: ({ commit }, value) => {
    commit('selectSidebar', value)
    commit('menu/setMenuGridArea', null, { root: true })
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
