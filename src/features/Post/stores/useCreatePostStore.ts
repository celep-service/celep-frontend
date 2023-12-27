import type { GenderCode } from '@/model/Gender'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCreatePostStore = defineStore('createPost', () => {
  /* State */
  const celebId = ref<number>()
  const celebNameSearchKeyword = ref<string>()
  const gender = ref<GenderCode>('MALE')
  const title = ref<string>()
  const codyImagePreviewUrl = ref<string>()

  /* Getter */
  
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
  const resetAllState = () => {
    resetCelebId()
    resetCelebNameSearchKeyword()
    resetGender()
    resetTitle()
    resetCodyImage()
  }

  return {
    celebId,
    celebNameSearchKeyword,
    gender,
    title,
    codyImagePreviewUrl,
    resetCelebId,
    resetAllState
  }
})

export default useCreatePostStore
