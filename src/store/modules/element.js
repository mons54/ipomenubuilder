import { v4 as uid } from 'uuid'

const state = () => ({
  actived: null,
  clicked: null,
  draged: null,
  resized: null,
  activedText: null,
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
  activeElement({ commit }, id) {
    commit('activeElement', id)
    commit('menu/setMenuGridArea', null, { root: true })
  },
  clickElement({ commit, state }, id) {
    if (state.resized === id || state.draged === id)
      return
    commit('clickElement', id)
  },
  dragElement({ commit }, id) {
    commit('dragElement', id)
    commit('clickElement', null)
  },
  desactiveElement({ commit, state }) {
    if (state.resized)
      return
    commit('activeElement', null)
    commit('clickElement', null)
    commit('activeElementText', null)
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
  clickElement(state, id) {
    state.clicked = id
  },
  dragElement(state, id) {
    state.draged = id
  },
  resizeElement(state, id) {
    state.resized = id
  },
  activeElementText(state, id) {
    state.activedText = id
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
