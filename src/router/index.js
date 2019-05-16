import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/product',
    component: Layout,
    meta: {
      title: '产品',
      icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/product/product'),
        name: 'product',
        meta: { title: '产品', icon: 'edit' }
      },
      {
        path: 'product_detail',
        component: () => import('@/views/product/productDetail'),
        meta: { title: '添加/编辑产品' },
        hidden: true
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    name: '轮播图',
    meta: {
      title: '轮播图',
      icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/banner/banner'),
        name: 'banner',
        meta: { title: '轮播图', icon: 'edit' }
      },
      {
        path: 'banner_detail',
        component: () => import('@/views/banner/bannerDetail'),
        meta: { title: '添加/编辑Banner' },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    name: '分类',
    meta: {
      title: '分类',
      icon: 'example'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/category/category'),
        name: 'category',
        meta: { title: '分类', icon: 'edit' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'example',
      roles: [0]
    },
    children: [
      {
        path: 'member',
        component: () => import('@/views/user/user'),
        name: 'user',
        meta: { title: '会员', icon: 'edit' }
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/admin/admin'),
        meta: { title: '管理员', icon: 'edit' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
