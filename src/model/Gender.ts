export type GenderCode = 'MALE' | 'FEMALE'
export type Gender = '남성' | '여성'

export const GENDER_MAP = new Map<GenderCode, Gender>([
  ['MALE', '남성'],
  ['FEMALE', '여성']
])
