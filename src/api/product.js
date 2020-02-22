import axios from '@/utils/request'

export function apiAddProduct(params) {
  return axios.post('product/add', {
    title: params.title,
    subTitle: params.subTitle,
    detailInfo: params.detailInfo,
    priceNow: params.priceNow,
    priceOrigin: params.priceOrigin,
    imgCover: params.imgCover,
    category: params.category
  })
}

export function apiGetProduct(pageNum, pageSize, category) {
  return axios.get(`product/all?pageNum=${pageNum}&pageSize=${pageSize}&category=${category}`)
}

export function apiGetProductDetail(uid) {
  return axios.get(`product/detail?uid=${uid}`)
}

export function apiDeleteProduct(id) {
  return axios.post('product/delete', {
    id: id
  })
}

export function apiUpdateProduct(uid, params) {
  return axios.post('product/update', {
    uid: uid,
    params
  })
}

export function apiGetQiNiuToken(id, params) {
  return axios.post('token/qiniu')
}
