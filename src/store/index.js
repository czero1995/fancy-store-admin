import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import app from './modules/app'
import about from './modules/about'
import product from './modules/product'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    app,
    about,
    user,
    permission,
    product,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      paths: ['app'],
    }),
  ],
})
