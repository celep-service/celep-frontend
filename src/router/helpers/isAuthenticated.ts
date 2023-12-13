import { ACCESS_TOKEN_KEY } from '@/constants/jwt'

const isAuthenticated = () => {
  // TODO: '/users/me' API가 추가되면 user 스토어의 isAuthenticated state로 변경될 예정
  return !!localStorage.getItem(ACCESS_TOKEN_KEY)
}

export default isAuthenticated
