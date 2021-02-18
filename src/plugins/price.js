import { priceFormat } from '@/helpers/price.js'

export default {

  install (Vue) {
    Vue.filter('price', priceFormat)
  }
}
