import Layout from '@views/layout/Layout.vue'
import List from '@views/labels/List.vue'

export default {
  path: '/labels',
  name: 'labels',
  redirect: '/labels/list',
  meta: {
    title: '标签管理',
    icon: 'Paperclip',
    index: 97
  },
  component: Layout,
  children: [
    {
      path: 'list',
      component: () => import('@views/labels/List.vue'),
      meta: {
        title: '标签列表',
      }
    }
  ]
}