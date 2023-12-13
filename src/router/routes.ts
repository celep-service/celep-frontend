import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/posts/search',
    name: 'posts/search',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/PostsSearchView.vue')
  },
  {
    path: '/posts/create',
    name: 'posts/create',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/PostsCreateView.vue')
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    meta: { requiresAuth: true },
    component: () => import('@/views/BookmarksView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('@/views/ProfileView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/users/create',
    name: 'users/create',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/UsersCreateView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
] as RouteRecordRaw[]
