export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/posts/search',
    name: 'posts/search',
    component: () => import('@/views/PostsSearchView.vue')
  },
  {
    path: '/posts/create',
    name: 'posts/create',
    component: () => import('@/views/PostsCreateView.vue')
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('@/views/BookmarksView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  }
]
