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
  textActived(state) {
    if (state.actived && state.actived.type === 'text' && state.text)
      return state.text
    return null
  },
}

const actions = {}

const mutations = {
  clickElement(state, value) {
    state.clicked = value
    if (state.actived !== state.clicked) {
      state.actived = null
      state.text = null
    }
  },
  activeElement(state, value) {
    if (state.clicked === value)
      state.actived = value
  },
  activeElementText(state, value) {
    state.text = value
  },
  desactiveElement(state) {
    state.clicked = null
    state.actived = null
    state.text = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
