import { menu } from '@/helpers/menu'

export default {
  getOne () {
    return new Promise(resolve => resolve({
      data: {
        menu,
      }
    }))
  },
}
