import type { Gender } from '@/model/Gender'
import type { Pagination, PaginationQueryParams } from '@/model/Pagination'
import type { TimeStampString } from '@/model/Time'

export type ClothesCategoryCode = 'TOP' | 'BOTTOM' | 'OUTER' | 'SHOES' | 'BAG' | 'ACCESSORY'
export type ClothesCategory = '상의' | '하의' | '아우터' | '신발' | '가방' | '악세사리'

export const CLOTHES_CATEGORY_MAP = new Map<ClothesCategoryCode, ClothesCategory>([
  ['ACCESSORY', '악세사리'],
  ['BAG', '가방'],
  ['BOTTOM', '하의'],
  ['OUTER', '아우터'],
  ['SHOES', '신발'],
  ['TOP', '상의']
])

export interface ClothesTemplate {
  createdAt: TimeStampString
  updatedAt: TimeStampString
  id: number
  isBookmarked?: boolean
  bookmarkCount: number
  name: string
  clothesCategory: ClothesCategoryCode
  brand: string
  gender: Gender
  imageUrl: string
  sellUrl: string
}

export type ClothesListRequest = {
  queryParams: PaginationQueryParams & {
    clothesCategory?: ClothesCategoryCode
    search?: string
  }
}

export type ClothesListResponse = Pagination<ClothesTemplate>
