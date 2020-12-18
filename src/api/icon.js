import { icons } from '@/helpers/icon'

export default {
  getAll() {
    return new Promise(resolve => resolve({
      data: {
        icons,
      }
    }))
  }
}
