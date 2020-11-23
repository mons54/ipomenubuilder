import image from '@/api/image.js'

const state = () => ({
  search: 'Restaurant',
  images: [],
  render: [],
})

const getters = {}

const actions = {
  getImageData({ commit }, q = 'restaurant') {
    image.getImages(q, images => {
      commit('setImages', images)
    })
  }
}

const mutations = {
  setImages: (state, images) => {
    state.images = images
  },
  setRender: (state, value) => {
    state.render = value
  },
  setSearch: (state, value) => {
    state.search = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
