import Layout from '@views/layout/Layout.vue'

export default {
  path: '/blogs',
  name: 'blogs',
  redirect: '/blogs/list',
  meta: {
    title: '博客管理',
    icon: 'Notebook',
    index: 99
  },
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@views/blogs/list.vue'),
      meta: {
        title: '博客列表',
      }
    },
    {
      path: 'delete-list',
      component: () => import('@views/blogs/deleteList.vue'),
      meta: {
        title: '删除列表',
      }
    },
    {
      path: 'edit/:id',
      component: () => import('@views/blogs/edit.vue'),
      meta: {
        title: '编辑内容'
      },
      hidden: true
    }
  ]
}