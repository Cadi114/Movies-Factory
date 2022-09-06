import axios from 'axios'

// import.meta.env.VITE_APP_BASE_API

// let url = 'http://127.0.0.1:8080'
// if (import.meta.env.ENV === 'development') {
//   console.log(import.meta.env.ENV)
// }

const request = axios.create({
  baseURL: 'http://127.0.0.1:8080'
})

export default request
