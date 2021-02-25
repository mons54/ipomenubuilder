import axios from 'axios'

const apiKey = process.env.VUE_APP_PIXABAY_APIKEY

export default {
  getImages(q, cb) {
    axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${q}&per_page=200&min_width=400&image_type=photo&pretty=true`).
    then(({data}) => {
      cb(data.hits)
    })
  }
}
