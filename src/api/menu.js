import { menu } from '@/helpers/menu'

export default {
  getOne (id) {

    let response = menu

    const data = localStorage.getItem(id)

    console.log(data)

    if (data) {
      response = {
        ...response,
        ...JSON.parse(data),
      }
    }
    return new Promise(resolve => resolve({
      data: {
        menu: response,
      }
    }))
  },
  save (id, data) {
    return new Promise(resolve => {
      localStorage.setItem(id, data)
      resolve(true)
    })
  },
}
