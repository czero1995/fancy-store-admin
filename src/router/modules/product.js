export default {
  path: '/product',
  name: 'Product',
  meta: {
    title: '产品管理',
    icon: 'el-icon-info',
  },
  component: () => import('@/views/RouterView'),
  children: [
    {
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '产品列表',
      },
      component: () => import('@/views/product/list/Index'),
    },
    {
      path: 'category',
      name: 'ProductCategory',
      meta: {
        title: '产品分类',
      },
      component: () => import('@/views/product/category/Index'),
    },
    {
      path: 'banner',
      name: 'ProductBanner',
      meta: {
        title: '产品轮播',
      },
      component: () => import('@/views/product/banner/Index'),
    },
  ],
}
