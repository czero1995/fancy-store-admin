import http from '@/util/http'

export function apiGetProductList(pageNum, categoryUid) {
  return http.get(`product/all?pageNum=${pageNum}&categoryUid=${categoryUid}`)
}
export function apiAddProductItem(data) {
  return http.post('product/add', { ...data })
}

export function apiGetProductItem(uid) {
  return http.get(`product/detail?uid=${uid}`)
}

export function apiEditProductItem(uid, params) {
  return http.post('product/update', { uid, params })
}

export function apiDeleteProductItem(uid) {
  return http.post('product/delete', { uid })
}
