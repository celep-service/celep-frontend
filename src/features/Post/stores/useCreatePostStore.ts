import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCreatePostStore = defineStore('createPost', () => {
  /* State */
  const celebId = ref<number>()
  const celebNameSearchKeyword = ref<string>()
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
  const resetTitle = () => {
    title.value = undefined
  }
  const resetCodyImage = () => {
    codyImagePreviewUrl.value = undefined
  }
  const resetAllState = () => {
    resetCelebId()
    resetCelebNameSearchKeyword()
    resetTitle()
    resetCodyImage()
  }

  return {
    celebId,
    celebNameSearchKeyword,
    title,
    codyImagePreviewUrl,
    resetCelebId,
    resetAllState
  }
})

export default useCreatePostStore
