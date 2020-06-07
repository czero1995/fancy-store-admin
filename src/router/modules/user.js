export default {
  path: '/user',
  name: 'User',
  meta: {
    title: '用户管理中心',
    icon: 'el-icon-info',
    roles: [1],
  },
  component: () => import('@/views/RouterView'),
  children: [
    {
      path: 'baby',
      name: 'UserBaby',
      meta: {
        title: '宝宝管理中心',
      },
      component: () => import('@/views/RouterView'),
      children: [
        {
          path: 'info',
          name: 'UserBabyInfo',
          meta: {
            title: '宝宝信息',
          },
          component: () => import('@/views/user/baby/info/Index'),
        },
        {
          path: 'family',
          name: 'UserBabyFamily',
          meta: {
            title: '宝宝家庭',
          },
          component: () => import('@/views/user/baby/family/Index'),
        },
      ],
    },
    {
      path: 'device',
      name: 'UserDeice',
      hidden: true,
      meta: {
        title: '用户设备',
      },
      component: () => import('@/views/user/device/Index'),
    },
  ],
}
