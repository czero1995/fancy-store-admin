import store from '@/store'

export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some((role) => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }

    return true
  } else {
    console.error('没有权限')
    return false
  }
}
