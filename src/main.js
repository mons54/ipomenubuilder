import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from '@/App.vue'
import store from '@/store'
import crop from '@/plugins/crop'
import font from '@/plugins/font'
import interact from '@/plugins/interact'
import i18n from '@/plugins/i18n'
import price from '@/plugins/price'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/_fonts.scss'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(crop)
Vue.use(font)
Vue.use(interact)
Vue.use(price)

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
