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
