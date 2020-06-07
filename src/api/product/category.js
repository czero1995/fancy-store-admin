import http from '@/util/http'

export function apiGetCategory(title) {
  return http.get(`category/all?title=${title || ''}`)
}

export function apiAddCategoryItem(data) {
  return http.post('category/add', { ...data })
}

export function apiGetCategoryItem(uid) {
  return http.get(`category/detail?uid=${uid}`)
}

export function apiEditCategoryItem(uid, params) {
  return http.post('category/update', { uid, params })
}

export function apiDeleteCategoryItem(uid) {
  return http.post('category/delete', { uid })
}
