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

export function apiGetBannerDetail(id) {
  return axios.get(`banner/detail?id=${id}`)
}
export function apiDeleteBanner(id) {
  return axios.post('banner/delete', {
    id: id
  })
}
export function apiUpdateBanner(id, params) {
  return axios.post('banner/update', {
    id: id,
    params
  })
}
