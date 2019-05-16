// import { apiGetAccessWeight } from '@/api/albums'
const commonUse = {
  state: {
    accessWeightData: []
  },

  mutations: {
    SET_ACCESS_WEIGHT: (state, accessWeight) => {
      state.accessWeightData = accessWeight
    }
  },

  actions: {
    // 获取资源权限信息
    GetAccessWeight({ commit, state }) {
      // return new Promise((resolve, reject) => {
      //   apiGetAccessWeight()
      //     .then(response => {
      //       commit('SET_ACCESS_WEIGHT', response.data.options)
      //       resolve(response)
      //     })
      //     .catch(error => {
      //       reject(error)
      //     })
      // })
    }
  }
}

export default commonUse
