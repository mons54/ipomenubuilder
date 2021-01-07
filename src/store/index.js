import Vue from 'vue'
import Vuex from 'vuex'
import element from './modules/element'
import format from './modules/format'
import history from './modules/history'
import icon from './modules/icon'
import image from './modules/image'
import menu from './modules/menu'
import scale from './modules/scale'
import sidebar from './modules/sidebar'
import text from './modules/text'
import translate from './modules/translate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    element,
    format,
    history,
    icon,
    image,
    menu,
    scale,
    sidebar,
    text,
    translate,
  },
})
