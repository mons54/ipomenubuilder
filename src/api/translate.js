import { languages, translation } from '@/helpers/translate'

export default {
  getLanguages () {
    return new Promise(resolve => resolve({
      data: {
        languages,
      }
    }))
  },
  translate (language, texts) {

    texts.forEach((text, key) => {
      const data = translation[text]
      if (data) {
        texts[key] = data[language]
      }
    })

    return new Promise(resolve => resolve({
      data: {
        translation: texts,
      }
    }))
  },
}
