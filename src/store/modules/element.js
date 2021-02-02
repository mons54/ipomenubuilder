import { v4 as uid } from 'uuid'

const state = () => ({
  actived: null,
  clicked: null,
  activedText: null,
  onResize: false,
})

const getters = {
  actived(state, getters, rootState, rootGetters) {
    const elements = rootGetters['menu/page'].elements
    return elements.find(element => element.id === state.actived)
  },
  activedDish(state, getters) {
    if (getters.actived && getters.actived.type === 'dish')
      return getters.actived
    return null
  },
  activedImage(state, getters) {
    if (getters.actived && getters.actived.type === 'image')
      return getters.actived
    return null
  },
  activedText(state, getters) {
    const { actived } = getters
    if (actived && actived.elements)
      return actived.elements.find(element => element.id === state.activedText)
    return null
  },
}

const actions = {
  clickElement({ state }, value) {
    state.clicked = value
    if (state.actived !== state.clicked) {
      state.actived = null
      state.text = null
    }
  },
  activeElement({ commit }, element) {
    commit('activeElement', element)
    commit('menu/setMenuGridArea', null, { root: true })
  },
  desactiveElement({ commit, state }) {
    if (state.onResize)
      return
    state.clicked = null
    state.actived = null
    state.text = null
    commit('menu/setMenuGridArea', null, { root: true })
  },
  deleteElement({ dispatch, state, rootGetters }) {
    const elements = rootGetters['menu/page'].elements
    const index = elements.findIndex(value => value.id === state.actived)
    elements.splice(index, 1)
    dispatch('desactiveElement')
  },
  duplicateElement({ commit, getters, rootGetters }) {
    const element = JSON.parse(JSON.stringify(getters.actived))
    element.id = uid()
    element.rect.top += 20
    element.rect.left += 20
    rootGetters['menu/page'].elements.push(element)
    commit('activeElement', element.id)
  },
}

const mutations = {
  activeElement(state, id) {
    state.actived = id
  },
  activeElementText(state, id) {
    state.activedText = id
  },
  onResize(state, value) {
    state.onResize = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
