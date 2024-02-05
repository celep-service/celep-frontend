import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSplashStore = defineStore('splash', () => {
  /* State */
  const isSplashViewShown = ref(false)

  return {
    isSplashViewShown
  }
})

export default useSplashStore
