import type { ApiResponse } from '@/model/Api'

export interface PaginationQueryParams {
  size?: number
  page?: number
}

export interface PaginationData<T> {
  content: T[]
  pageable: {
    pageNumber: number
  }
  last: boolean
}

export type Pagination<T> = ApiResponse<PaginationData<T>>
