import { apiGetUserInfo } from '@/api/user/login'
const state = {
  roles: [],
  routes: [],
  userInfo: {},
}
const mutations = {
  SET_ROLES: (state, data) => {
    state.roles = data
  },
  SET_USER_INFO: (state, data) => {
    state.userInfo = data
  },
  SET_ROUTES: (state, data) => {
    state.routes = data
  },
}
const actions = {
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      apiGetUserInfo().then((res) => {
        console.log('res: ', res)
        if (res.data.code === 0) {
          const roles = res.data.data.roles
          const { nickName, uid, avatarUrl } = res.data.data

          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }
          commit('SET_ROLES', roles)
          commit('SET_USER_INFO', { nickName, uid, avatarUrl })
          resolve(roles)
        } else {
          reject('roles请求失败')
        }
      })
    })
  },
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_ROLES', [])
      localStorage.removeItem('sessionId')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
