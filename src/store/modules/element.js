import { v4 as uid } from 'uuid'

const state = () => ({
  actived: null,
  clicked: null,
  text: null,
})

const getters = {
  dishActived(state) {
    if (state.actived && state.actived.type === 'dish')
      return state.actived
    return null
  },
  imageActived(state) {
    if (state.actived && state.actived.type === 'image')
      return state.actived
    return null
  },
  textActived(state) {
    if (state.actived && state.actived.type === 'text' && state.text)
      return state.text
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
  activeElement({ commit, state }, element) {
    if (state.clicked === element) {
      commit('activeElement', element)
      commit('menu/setMenuGridArea', null, { root: true })
    }
  },
  desactiveElement({ commit, state }) {
    state.clicked = null
    state.actived = null
    state.text = null
    commit('menu/setMenuGridArea', null, { root: true })
  },
  deleteElement({ dispatch, state, rootGetters }) {
    const elements = rootGetters['menu/page'].elements
    const index = elements.findIndex(value => value === state.actived)
    elements.splice(index, 1)
    dispatch('desactiveElement')
  },
  duplicateElement({ commit, state, rootGetters }) {
    const element = JSON.parse(JSON.stringify(state.actived))
    element.id = uid()
    element.rect.top += 20
    element.rect.left += 20
    rootGetters['menu/page'].elements.push(element)
    commit('activeElement', element)
  },
}

const mutations = {
  activeElement(state, value) {
    state.actived = value
  },
  activeElementText(state, value) {
    state.text = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
