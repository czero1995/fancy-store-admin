import axios from '@/utils/request'
// 登录
export function apiUserLogin(user, pwd) {
  return axios.post('user/login', {
    user: user,
    pwd: pwd
  })
}

export function apiGetUser(pageNum, pageSize) {
  return axios.get(`user/all?pageNum=${pageNum}&pageSize=${pageSize}`)
}
export function apiDeleteUser(id) {
  return axios.post('user/delete', {
    id: id
  })
}
