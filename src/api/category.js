import axios from '@/utils/request'

export function apiAddCategory(title) {
  return axios.post('category/add', {
    title: title
  })
}

export function apiGetCategory() {
  return axios.get('category/all')
}

export function apiDeleteCategory(id) {
  return axios.post('category/delete', {
    id: id
  })
}
