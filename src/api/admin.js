import axios from '@/utils/request'

export function apiAddAdmin(params) {
  return axios.post('admin/register', {
    admin: params.admin,
    pwd: params.pwd,
    avatar: params.avatar,
    roles: params.roles
  })
}

export function apiAdminLogin(admin, pwd) {
  return axios.post('admin/login', {
    admin: admin,
    pwd: pwd
  })
}

export function apiAdminInfo(id) {
  return axios.get('admin/info')
}

export function apiGetAdmin() {
  return axios.get('admin/all')
}

export function apiDeleteAdmin(id) {
  return axios.post('admin/delete', {
    id: id
  })
}

export function apiUpdateAdmin(id, params) {
  return axios.post('admin/update', {
    id: id,
    params
  })
}
export function apiLogoutAdmin(id, params) {
  return axios.post('admin/logout')
}
