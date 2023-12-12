import type { ApiResponse } from '@/model/Api'
import type { GenderCode } from '@/model/Gender'

export interface UserTemplate {
  id: number
  name: string
  email: string
  gender: GenderCode
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserTemplate {
  accessToken: string
}

export type LoginUserResponse = ApiResponse<LoginUserTemplate>
