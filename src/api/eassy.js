import axios from '@/utils/request'
// 请求专辑数据
export function apiGetPost(offset, apiAlbumsParamer) {
  return axios.post(
    `essay/load/filterId/undefined?offset=${offset}&limit=50&action=load&order=-created`,
    apiAlbumsParamer
  )
}
