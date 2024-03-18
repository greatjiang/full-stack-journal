import Layout from '@views/layout/Layout.vue'

export default {
  path: '/system',
  name: 'system',
  redirect: '/system/statistics',
  meta: {
    title: '系统管理',
    icon: 'Setting',
    index: 95
  },
  component: Layout,
  children: [
    {
      path: 'statistics',
      component: '',
      meta: {
        title: '统计管理',
      }
    },
    {
      path: 'logs',
      component: '',
      meta: {
        title: '日志管理',
      }
    },
    {
      path: 'administrator',
      component: () => import('@views/system/users/list.vue'),
      meta: {
        title: '管理员管理',
      }
    },
    {
      path: 'mysql',
      component: '',
      meta: {
        title: '数据库管理',
      }
    },
    {
      path: 'website',
      component: '',
      meta: {
        title: '站点管理',
      }
    }
  ]
}