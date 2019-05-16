import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import commonUse from './modules/commonUse'
import getters from './getters'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    commonUse
  },
  getters,
  plugins: [
    // createPersistedState({
    //   storage: window.sessionStorage
    // })
  ]
})

export default store
