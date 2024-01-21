import type { LoggedInUserTemplate } from '@/model/User'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useUserStore = defineStore('user', () => {
  /* State */
  const user = ref<LoggedInUserTemplate>()

  /* Getter */
  const isAuthenticated = computed(() => !!user.value)

  /* Action */

  return {
    user,
    isAuthenticated
  }
})

export default useUserStore
