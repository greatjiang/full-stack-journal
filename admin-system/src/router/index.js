import { createRouter, createWebHistory } from 'vue-router'
import { isLogin } from '@/auth/auth'

import Layout from '@views/layout/Layout.vue'
import Login from '@views/login/Login.vue'
import NotFound from '@views/404.vue'

// 引入子路由模块
const routesModules = import.meta.globEager('./children/*.js')

const asyncRouterMap = (() => Object.values(routesModules).map(
  (item) => {
    // console.log(item)
    return item.default
  }
))()

const constantRouterMap = [
  {
    path: '/:pathMatch(.*)*',
    component: Layout,
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      'title': '登录'
    },
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
    hidden: true
  },
]

// 添加路由
const sortRouter = Object.values(asyncRouterMap).map((currentValue) => {
  // console.log(currentValue)
  return currentValue
}).sort((a, b) => {
  // console.log(typeof b.meta.index)
  return b.meta.index - a.meta.index
})

// console.log(sortRouter)

const computedRoutes = constantRouterMap.concat(sortRouter)

// console.log(computedRoutes)
// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: computedRoutes
})

// 平面路由 用于面包屑


// 验证登录
router.beforeEach((to, from) => {
  if (to.name !== 'login' && !isLogin()) {
    return '/login'
  }

  const icon = to.meta.icon
  if (icon) {
    to.matched.forEach(record => {
      record.meta.icon = icon
    })
  }
})

export default router

export {
  constantRouterMap,
  computedRoutes
}
