import Vue from 'vue'
import menu from '@/api/menu'
import { defaultColors } from '@/helpers/color'
import { grids } from '@/helpers/grid'
import { addPage } from '@/helpers/menu'

const state = () => ({
  id: null,
  matrix: false,
  data: null,
  onSave: false,
  saved: true,
  page: 0,
  area: 0,
  gridArea: null,
  element: null,
  translation: null,
})

const getters = {
  page(state) {
    let page = state.data.pages[state.page]
    if (!page)
      page = state.data.pages[0]
    return page
  },
  area(state, getters) {
    let area = getters.page.areas[state.area]
    if (!area)
      area = getters.page.areas[0]
    return area
  },
  gridArea(state, getters, rootState) {
    if (!state.gridArea)
      return null
    if (!getters.area.areas[state.gridArea]) {
      rootState.history.break = true
      Vue.set(getters.area.areas, state.gridArea, {
        image: null,
      })
    }
    return getters.area.areas[state.gridArea]
  },
  element(state, getters) {
    return getters.page.elements.find(element => element.id === state.element)
  },
}

const actions = {
  async getMenuData({ commit }, id) {

    const { data } = await menu.getOne(id)

    commit('setMenuData', data.menu)

    return data
  },
  saveMenuData({ commit, state }) {

    commit('setMenuOnSave', true)

    return menu.save(state.id, JSON.stringify(state.data)).
    then(() => {
      commit('setMenuSaved', true)
    }).
    catch(() => {
      commit('setMenuSaved', false)
    }).
    finally(() => {
      commit('setMenuOnSave', false)
    })
  },
  resizeMenu({ state }, format) {

    if (format.area > 1 && state.data.pages.length % 2) {
      addPage(state.data, state.data.pages.length)
    }

    if (state.data.format.area !== format.area) {

      state.data.pages.forEach((page, i) => {

        const diff = state.data.format.width - format.width
        page.elements.forEach(element => {
          element.rect.left -= diff
        })


        // Remove use less area
        page.areas.splice(0, state.data.format.area - format.area)


        let size = i % 2 ? format.outside : format.inside

        size.forEach((width, i) => {
          if (!page.areas[i]) {
            page.areas.unshift({
              width,
              colors: defaultColors[0],
              grid: grids[0],
              areas: {},
            })
          }
        })

        size.forEach((width, i) => {
          page.areas[i].width = width
        })
      })
    }

    state.data.format = format
  },
  selectPageArea({ commit }, { page, index }) {
    commit('setMenuPage', page)
    commit('setMenuArea', index)
  },
  selectGridArea({ commit }, { index, name }) {
    commit('setMenuArea', index)
    commit('setMenuGridArea', name)
  },
}

const mutations = {
  setMenuData(state, data) {
    state.data = data
  },
  setMenuPage(state, page) {
    state.page = page
  },
  setMenuArea(state, index) {
    state.area = index
  },
  setMenuGridArea (state, name) {
    state.gridArea = name
  },
  setMenuElement (state, id) {
    state.element = id
  },
  setMenuId(state, value) {
    state.id = value
  },
  setMenuSaved(state, value) {
    state.saved = value
  },
  setMenuOnSave(state, value) {
    state.onSave = value
  },
  setMenuTranslation(state, value) {
    state.translation = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
