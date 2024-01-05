import useToastMessageStore from '@/composables/useToastMessageStore'
import { API_SERVER_URL } from '@/constants/api'
import { ACCESS_TOKEN_KEY } from '@/constants/jwt'
import type { ApiErrorResponse } from '@/model/Api'
import router from '@/router'
import axios, { isAxiosError } from 'axios'

const IS_DEV = import.meta.env.DEV

const axiosInstance = axios.create({
  baseURL: IS_DEV ? '/api' : API_SERVER_URL,
  timeout: 12000
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)

    if (config.url !== '/users/login' && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    /* Pinia */
    const { showToastMessage } = useToastMessageStore()

    if (isAxiosError<ApiErrorResponse>(error) && error.response) {
      if (
        error.response.status === 401 &&
        [3009, 3010, 3011, 3012].includes(error.response.data.code)
      ) {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
        router.push({ name: 'login' })
        showToastMessage('로그인이 만료되었습니다.', 'Info')
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
