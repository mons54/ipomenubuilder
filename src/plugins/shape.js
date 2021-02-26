import Ellipse from '@/components/Ellipse'
import Rectangle from '@/components/Rectangle'

export default {
  install (Vue) {
    Vue.component('shapeEllipse', Ellipse)
    Vue.component('shapeRectangle', Rectangle)
  }
}
