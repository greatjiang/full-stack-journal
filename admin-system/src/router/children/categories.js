import Layout from '@views/layout/Layout.vue'

export default {
  path: '/categories',
  name: 'categories',
  redirect: '/categories/list',
  meta: {
    title: '专题管理',
    icon: 'Folder',
    index: 98
  },
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@views/categories/List.vue'),
      meta: {
        title: '专题列表',
      }
    },
    {
      path: 'create',
      component: 'list',
      meta: {
        title: '新建列表'
      },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: 'edit',
      meta: {
        title: '编辑列表'
      },
      hidden: true
    }
  ]
}