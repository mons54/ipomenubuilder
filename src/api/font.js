import { get } from '@/helpers/axios.js'

export default {
  getAll () {
    return get(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDn_2rELUXlf5tSMZCLPKGsrx78YFVPf2Q`)
  },
}
