import { languages, translation } from '@/helpers/translate'

export default {
  getLanguages () {
    return new Promise(resolve => resolve({
      data: {
        languages,
      }
    }))
  },
  translate (text) {
    return new Promise(resolve => resolve({
      data: {
        translation: translation[text] || text,
      }
    }))
  },
}
