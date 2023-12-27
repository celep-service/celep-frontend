import type { ClothesTemplate } from '@/model/Clothes'
import type { GenderCode } from '@/model/Gender'
import { isEmptyArray } from '@/utils/array'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCreatePostStore = defineStore('createPost', () => {
  /* State */
  const celebId = ref<number>()
  const celebNameSearchKeyword = ref<string>()
  const gender = ref<GenderCode>('MALE')
  const title = ref<string>()
  const codyImagePreviewUrl = ref<string>()
  const checkedClothesList = ref<ClothesTemplate[]>([])
  const clothesNameSearchKeyword = ref<string>()

  /* Action */
  const resetCelebId = () => {
    celebId.value = undefined
  }
  const resetCelebNameSearchKeyword = () => {
    celebNameSearchKeyword.value = undefined
  }
  const resetGender = () => {
    gender.value = 'MALE'
  }
  const resetTitle = () => {
    title.value = undefined
  }
  const resetCodyImage = () => {
    codyImagePreviewUrl.value = undefined
  }
  const resetCheckedClothesIdList = () => {
    checkedClothesList.value = []
  }
  const resetClothesNameSearchKeyword = () => {
    clothesNameSearchKeyword.value = undefined
  }
  const resetAllState = () => {
    resetCelebId()
    resetCelebNameSearchKeyword()
    resetGender()
    resetTitle()
    resetCodyImage()
    resetCheckedClothesIdList()
    resetClothesNameSearchKeyword()
  }

  return {
    celebId,
    celebNameSearchKeyword,
    gender,
    title,
    codyImagePreviewUrl,
    checkedClothesList,
    clothesNameSearchKeyword,
    resetCelebId,
    resetAllState
  }
})

export default useCreatePostStore
