import Layout from '@views/layout/Layout.vue'

export default {
  path: '/personal',
  name: 'personal',
  redirect: '/personal/list',
  meta: {
    title: '个人介绍管理',
    icon: 'User',
    index: 96
  },
  hidden: true
}