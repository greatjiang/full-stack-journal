import Layout from '@views/layout/Layout.vue'

export default {
  path: '/advertisements',
  name: 'advertisements',
  redirect: '/advertisements/list',
  meta: {
    title: '广告管理',
    icon: 'ChatDotSquare',
    index: 94
  },
  component: Layout,
  children: [
    {
      path: 'list',
      component: '',
      meta: {
        title: '广告列表',
      }
    },
    {
      path: 'create',
      component: 'create',
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