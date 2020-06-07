import Vue from 'vue'
import VueRouter from 'vue-router'
import productRouter from './modules/product'
import orderRouter from './modules/order'
import userRouter from './modules/user'
Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '主页',
      icon: 'el-icon-s-home',
      keepAlive: true,
    },
    component: () => import('@/views/Home'),
  },
  {
    path: '/login',
    component: () => import('@/views/login/Index'),
    meta: {
      title: '登录',
      icon: 'el-icon-info',
    },
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  productRouter,
  orderRouter,
  userRouter,
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  // mode: 'history',
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })
const router = createRouter()

// router.beforeEach((to, from, next) => {
//   if(window.location.href.indexOf('code') >= 0){
//     let code = window.location.href.split("?")[1]
//     code = code.substring(5,code.indexOf('&'));
//     sessionStorage.setItem('c',code)
//   }
// })

router.afterEach(function (to) {
  document.title = to.meta.title
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
