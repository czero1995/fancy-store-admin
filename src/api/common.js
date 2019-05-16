import axios from '@/utils/request'

export function apiGetQiNiuToken(id, params) {
  return axios.post('token/qiniu')
}
