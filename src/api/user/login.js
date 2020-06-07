import http from '@/util/http'

export function apiGetUserLoginInfo(code) {
  return http.get(`wx/web/login?code=${code}`)
}

export function apiGetUserInfo(code) {
  return http.get(`user/info`)
}
