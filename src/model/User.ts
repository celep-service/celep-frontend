import type { ApiResponse } from '@/model/Api'
import type { GenderCode } from '@/model/Gender'

export interface UserTemplate {
  id: number
  name: string
  email: string
  gender: GenderCode
  userProfileImage?: string
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserTemplate {
  accessToken: string
}

export type LoginUserResponse = ApiResponse<LoginUserTemplate>

export interface CreateUserRequest {
  payload: {
    email: string
    name: string
    password: string
    gender: string
    userProfileImage?: string
  }
}

export type CreateUserResponse = ApiResponse<UserTemplate>

export interface LoggedInUserTemplate {
  id: number,
  name: string
  gender: GenderCode
  userProfileImage?: string
}

export type LoggedInUserResponse = ApiResponse<LoggedInUserTemplate>
