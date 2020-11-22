import { formats } from '@/helpers/menu'

export default {
  getAll () {
    return new Promise(resolve => resolve({
      data: {
        formats,
      }
    }))
  },
}
