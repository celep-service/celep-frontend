import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCreatePostStore = defineStore('createPost', () => {
  /* State */
  const celebId = ref<number>()
  const celebNameSearchKeyword = ref<string>()

  /* Getter */

  /* Action */
  const resetCelebId = () => {
    celebId.value = undefined
  }
  const resetCelebNameSearchKeyword = () => {
    celebNameSearchKeyword.value = undefined
  }
  const resetAllState = () => {
    resetCelebId()
    resetCelebNameSearchKeyword()
  }

  return {
    celebId,
    celebNameSearchKeyword,
    resetCelebId,
    resetAllState
  }
})

export default useCreatePostStore
