import { allergens } from '@/helpers/allergen'

export default {
  getAll() {
    return new Promise(resolve => resolve({
      data: {
        allergens,
      }
    }))
  }
}
