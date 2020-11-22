import { texts } from '@/helpers/text'

export default {
  getAll () {
    return new Promise(resolve => resolve({
      data: {
        texts,
      }
    }))
  },
}
