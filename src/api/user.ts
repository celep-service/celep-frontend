import axiosInstance from '@/api/config'
import type {
  CreateUserRequest,
  CreateUserResponse,
  LoggedInUserResponse,
  LoginUserRequest,
  LoginUserResponse
} from '@/model/User'

export const loginUser = async (req: LoginUserRequest) =>
  (await axiosInstance.post<LoginUserResponse>('/users/login', req)).data

export const createUser = async ({ payload }: CreateUserRequest) =>
  (await axiosInstance.post<CreateUserResponse>('/users', payload)).data

export const fetchLoggedInUser = async () =>
  (await axiosInstance.get<LoggedInUserResponse>('/users/me')).data
