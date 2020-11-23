import axios from 'axios'

export default {
  getImages(q, cb) {
    axios.get(`https://pixabay.com/api/?key=2996021-250590ce1db9b0b8f1068e11e&q=${q}&per_page=200&min_width=400&image_type=photo&pretty=true`).
    then(({data}) => {
      cb(data.hits)
    })
  }
}
