import Vue from 'vue'

const state = () => ({
  menu: null,
  data: [],
  index: 0,
  break: false,
  stop: false,
})

const getters = {
  hasUndoHistory: state => state.index > 0,
  hasRedoHistory: state => state.index < state.data.length - 1,
  data: state => state.data[state.index],
}

const actions = {
  addHistory ({ state, rootState, getters }) {

    if (state.stop)
      return

    if (state.break) {
      state.break = false
      return
    }

    const menu = JSON.stringify(rootState.menu)

    if (getters.data && getters.data.menu === menu)
      return

    if (state.index < state.data.length - 1)
      state.data.length = state.index + 1

    const data = {
      menu,
    }

    if (getters.data) {
      const clone = {...rootState}
      delete clone.history
      delete clone.menu
      delete clone.scale
      delete clone.contextmenu
      data.state = JSON.stringify(clone)
    }


    state.data.push(data)
    if (state.data.length > 200)
      state.data.splice(0, state.data.length - 200)
    state.index = state.data.length - 1
  },
  undoHistory ({ state, getters, dispatch }) {
    if (!getters.hasUndoHistory)
      return
    dispatch('restoreState')
    state.index--
    dispatch('restoreMenu')
  },
  redoHistory ({ state, getters, dispatch }) {
    if (!getters.hasRedoHistory)
      return
    state.index++
    dispatch('restoreState')
    dispatch('restoreMenu')
  },
  restoreState ({ rootState, getters }) {
    const state = JSON.parse(getters.data.state)
    for (const key in state) {
      if (rootState[key] !== state[key])
        Vue.set(rootState, key, state[key])
    }
  },
  restoreMenu ({ rootState, getters }) {
    Vue.set(rootState, 'menu', JSON.parse(getters.data.menu))
  },
}

const mutations = {
  startHistory (state) {
    state.break = false
    state.stop = false
  },
  breakHistory (state) {
    state.break = true
  },
  stopHistory (state) {
    state.stop = true
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
