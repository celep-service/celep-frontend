import useToastMessageStore from '@/composables/useToastMessageStore'
import useUserStore from '@/features/User/stores/useUserStore'
import routes from '@/router/routes'
import useBottomTabBarStore from '@/stores/useBottomTabBarStore'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

let isSplashViewShown = false

router.beforeEach(async (to, _, next) => {
  /* Pinia */
  const { isAuthenticated } = storeToRefs(useUserStore())
  const { showToastMessage } = useToastMessageStore()
  const { isActive: isActiveBottomTabBar } = storeToRefs(useBottomTabBarStore())

  if (!isSplashViewShown && to.name !== 'splash') {
    next({ name: 'splash', query: { redirectRoute: to.name } } as RouteLocationRaw)
    isSplashViewShown = true
    return
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' })
    showToastMessage('로그인을 해주세요.', 'Info')
    return
  }

  // 로그인 된 상태에서 접근 불가능한 페이지에 접근하는 경우 예외 처리
  if (isAuthenticated.value && (to.name === 'login' || to.name === 'users/create')) {
    next('/')
    showToastMessage('접근할 수 없습니다', 'Error')
    return
  }

  // route의 BottomTabBar 설정이 inactive인 경우 BottomTabBar를 비활성화
  isActiveBottomTabBar.value = to.meta.inactiveBottomTabBar ? false : true

  next()
})

export default router
