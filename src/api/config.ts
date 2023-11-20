import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 12000
})

export default axiosInstance
