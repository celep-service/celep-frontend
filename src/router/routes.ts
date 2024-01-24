import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/splash',
    name: 'splash',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/SplashView.vue')
  },
  {
    path: '/posts/search',
    name: 'posts/search',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/PostsSearchView.vue')
  },
  {
    path: '/posts/create/celeb',
    name: 'posts/create/celeb',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/PostsCreateCelebView.vue')
  },
  {
    path: '/posts/create/gender',
    name: 'posts/create/gender',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/PostsCreateGenderView.vue')
  },
  {
    path: '/posts/create/title',
    name: 'posts/create/title',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/PostsCreateTitleView.vue')
  },
  {
    path: '/posts/create/cody-image',
    name: 'posts/create/cody-image',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/PostsCreateCodyImageView.vue')
  },
  {
    path: '/posts/create/clothes',
    name: 'posts/create/clothes',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/PostsCreateClothesView.vue')
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    meta: { requiresAuth: true },
    component: () => import('@/views/BookmarksView.vue')
  },
  {
    path: '/bookmarks/posts',
    name: 'bookmarks/posts',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/BookmarksPostListView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('@/views/ProfileView.vue')
  },
  {
    path: '/profile/posts',
    name: 'profile/posts',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/MyPostListView.vue')
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
