import useToastMessageStore from '@/composables/useToastMessageStore'
import { isAuthenticated } from '@/router/helpers'
import routes from '@/router/routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  /* Pinia */
  const { showToastMessage } = useToastMessageStore()

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
    showToastMessage('로그인을 해주세요.', 'Info')
    return
  }

  next()
})

export default router
