import type { Pagination, PaginationQueryParams } from '@/model/Pagination'
import type { TimeStampString } from '@/model/Time'

export type CelebCategoryCode = 'TALENT' | 'MODEL' | 'SINGER' | 'ACTOR' | 'INFLUENCER' | 'ETC'
export type CelebCategory = '탤런트' | '모델' | '가수' | '배우' | '인플루언서' | '기타'

export interface CelebTemplate {
  id: number
  name: string
  imageUrl: string
  celebCategory: CelebCategoryCode
  createdAt: TimeStampString
  updatedAt: TimeStampString
}

export type CelebsRequest = {
  queryParams: PaginationQueryParams & {
    celebCategory?: CelebCategoryCode
    search?: string
  }
}

export type CelebsResponse = Pagination<CelebTemplate>

export interface CreateCelebRequest {
  payload: {
    name: string
    imageUrl: string
    celebCategory: CelebCategoryCode
  }
}
