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
    component: () => import('@/views/Post/PostsSearchView.vue')
  },
  {
    path: '/posts/create/celeb',
    name: 'posts/create/celeb',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/Post/PostsCreateCelebView.vue')
  },
  {
    path: '/posts/create/gender',
    name: 'posts/create/gender',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/Post/PostsCreateGenderView.vue')
  },
  {
    path: '/posts/create/title',
    name: 'posts/create/title',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/Post/PostsCreateTitleView.vue')
  },
  {
    path: '/posts/create/cody-image',
    name: 'posts/create/cody-image',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/Post/PostsCreateCodyImageView.vue')
  },
  {
    path: '/posts/create/clothes',
    name: 'posts/create/clothes',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/Post/PostsCreateClothesView.vue')
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    meta: { requiresAuth: true },
    component: () => import('@/views/Bookmark/BookmarksView.vue')
  },
  {
    path: '/bookmarks/posts',
    name: 'bookmarks/posts',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/Bookmark/BookmarksPostListView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('@/views/User/ProfileView.vue')
  },
  {
    path: '/profile/posts',
    name: 'profile/posts',
    meta: { requiresAuth: true, inactiveBottomTabBar: true },
    component: () => import('@/views/User/MyPostListView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/User/LoginView.vue')
  },
  {
    path: '/users/create',
    name: 'users/create',
    meta: { inactiveBottomTabBar: true },
    component: () => import('@/views/User/UsersCreateView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
] as RouteRecordRaw[]
