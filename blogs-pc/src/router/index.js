import { createRouter, createWebHistory } from 'vue-router'

const constantRouterMap = [
  {
    path: '/',
    component: () => import('@views/main.vue'),
  },
  {
    path: '/article/:id',
    component: () => import('@views/Detail.vue'),
  },
  {
    path: '/categories/:category',
    component: () => import('@views/Categories.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap,
})

export default router