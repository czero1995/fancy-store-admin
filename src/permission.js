import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          console.log('error: ', error)
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')

          next(`/login?redirect=${to.name}`)
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
})

function getToken() {
  if (localStorage.getItem('sessionId')) {
    return true
  }
  return false
}
