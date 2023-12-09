import axios from 'axios'

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL
const IS_DEV = import.meta.env.DEV

const axiosInstance = axios.create({
  baseURL: IS_DEV ? '/api' : API_SERVER_URL,
  timeout: 12000
})

export default axiosInstance
