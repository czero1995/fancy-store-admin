export default {
  path: '/order',
  name: 'Order',
  meta: {
    title: '订单管理',
    icon: 'el-icon-info',
  },
  component: () => import('@/views/RouterView'),
  children: [
    {
      path: 'info',
      name: 'OrderInfo',
      meta: {
        title: '订单信息',
      },
      component: () => import('@/views/order/info/Index'),
    },
    {
      path: 'log',
      name: 'OrderLog',
      hidden: true,
      meta: {
        title: '订单日志',
      },
      component: () => import('@/views/order/log/Index'),
    },
  ],
}
