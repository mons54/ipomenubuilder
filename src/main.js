import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from '@/App.vue'
import store from '@/store'
import font from '@/plugins/font'
import interact from '@/plugins/interact'
import i18n from '@/plugins/i18n'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/_fonts.scss'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(font)
Vue.use(interact)

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
