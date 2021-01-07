import translate from '@/api/translate.js'

const state = () => ({
  languages: [],
})

const getters = {}

const actions = {
  async getLanguages({ commit, state }) {
    if (!state.languages.length) {
      const { data } = await translate.getLanguages()
      commit('setLanguages', data.languages)
    }
    return state.languages
  },
}

const mutations = {
  setLanguages(state, languages) {
    state.languages = languages
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
