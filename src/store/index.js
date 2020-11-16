import Vue from 'vue'
import Vuex from 'vuex'
import history from './modules/history'
import menu from './modules/menu'
import sidebar from './modules/sidebar'
import text from './modules/text'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    menu,
    sidebar,
    text,
  },
})
