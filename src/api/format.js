import { formats } from '@/helpers/format'

export default {
  getAll () {
    return new Promise(resolve => resolve({
      data: {
        formats,
      }
    }))
  },
}
