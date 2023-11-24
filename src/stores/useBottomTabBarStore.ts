import { defineStore } from 'pinia'
import { ref } from 'vue'

const useBottomTabBarStore = defineStore('bottomTabBar', () => {
  /* State */
  const isActive = ref(true)

  return { isActive }
})

export default useBottomTabBarStore
