import axios from '@/utils/request'

export function apiAddBanner(params) {
  return axios.post('banner/add', {
    title: params.title,
    url: params.url,
    img: params.img
  })
}

export function apiGetBanner() {
  return axios.get('banner/all')
}

export function apiGetBannerDetail(uid) {
  return axios.get(`banner/detail?uid=${uid}`)
}
export function apiDeleteBanner(uid) {
  return axios.post('banner/delete', {
    uid
  })
}
export function apiUpdateBanner(uid, params) {
  return axios.post('banner/update', {
    uid,
    params
  })
}
