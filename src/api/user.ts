import axiosInstance from '@/api/config'
import type { LoginUserRequest, LoginUserResponse } from '@/model/User'

export const loginUser = async (req: LoginUserRequest) =>
  (await axiosInstance.post<LoginUserResponse>('/users/login', req)).data
