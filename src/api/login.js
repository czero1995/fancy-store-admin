import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'user/logout',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: 'user/load',
    method: 'get'
    // params: { token }
  })
}
