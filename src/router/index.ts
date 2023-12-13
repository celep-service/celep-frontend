import useToastMessageStore from '@/composables/useToastMessageStore'
import { isAuthenticated } from '@/router/helpers'
import routes from '@/router/routes'
import useBottomTabBarStore from '@/stores/useBottomTabBarStore'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  /* Pinia */
  const { showToastMessage } = useToastMessageStore()
  const { isActive: isActiveBottomTabBar } = storeToRefs(useBottomTabBarStore())

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
    showToastMessage('로그인을 해주세요.', 'Info')
    return
  }

  // route의 BottomTabBar 설정이 inactive인 경우 BottomTabBar를 비활성화
  isActiveBottomTabBar.value = to.meta.inactiveBottomTabBar ? false : true

  next()
})

export default router
