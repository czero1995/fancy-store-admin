import http from '@/util/http'

export function apiGetBanner(title) {
  return http.get(`banner/all?title=${title || ''}`)
}

export function apiAddBannerItem(data) {
  return http.post('banner/add', { ...data })
}

export function apiGetBannerItem(uid) {
  return http.get(`banner/detail?uid=${uid}`)
}

export function apiEditBannerItem(uid, params) {
  return http.post('banner/update', { uid, params })
}

export function apiDeleteBannerItem(uid) {
  return http.post('banner/delete', { uid })
}
