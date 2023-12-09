export interface ApiResponse<T> {
  isSuccess: boolean
  code: number
  message: string
  data: T
}
