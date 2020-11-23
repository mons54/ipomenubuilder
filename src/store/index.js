import Vue from 'vue'
import Vuex from 'vuex'
import format from './modules/format'
import history from './modules/history'
import image from './modules/image'
import menu from './modules/menu'
import sidebar from './modules/sidebar'
import text from './modules/text'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    format,
    history,
    image,
    menu,
    sidebar,
    text,
  },
})
