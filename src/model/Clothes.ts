import type { GenderCode } from '@/model/Gender'
import type { TimeStampString } from '@/model/Time'

export type ClothesCategoryCode = 'TOP' | 'BOTTOM' | 'OUTER' | 'SHOES' | 'BAG' | 'ACCESSORY'

export interface ClothesTemplate {
  createdAt: TimeStampString
  updatedAt: TimeStampString
  id: number
  name: string
  clothesCategory: ClothesCategoryCode
  brand: string
  gender: GenderCode
  imageUrl: string
  sellUrl: string
}
