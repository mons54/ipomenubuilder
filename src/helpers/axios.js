import axios from 'axios'

const token = btoa(process.env.API_KEY)

export const instance = axios.create({
  baseURL: '/',
  headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryYbayPTKMuJ9AcAc6',
  },
})

export const remove = function(uri) {
  return instance.delete(uri)
}

export const get = function(uri) {
  return instance.get(uri)
}

export const post = function(uri, data) {
  const formData = new FormData()
  for (let i in data)
    formData.append(i, data[i])
  return instance.post(uri, formData)
}
