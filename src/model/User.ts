import type { GenderCode } from '@/model/Gender'

export interface UserTemplate {
  id: number
  name: string
  email: string
  gender: GenderCode
}
