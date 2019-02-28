import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  /* Root */
  getters: {
    user: state => state.user,
    userRole: state => (state.user ? state.user.role : null)
  },
  state: {
    user: null
  },
  mutations: {},
  actions: {}
})

/**
 * Auto import store modules like:
 *  ./modules/[moduleName]/index.js => store.dispatch('[moduleName]')
 *  ./modules/[moduleName]/[subModuleName]/index.js => store.dispatch('[moduleName]/[subModuleName]')
 */
;(r =>
  r
    .keys()
    .sort((a, b) => a.length - b.length)
    .forEach(key => {
      let rst = key.match(/\/(.+)\//)[1]
      rst && store.registerModule(rst.split('/'), r(key).default || r(key))
    }))(require.context('./modules', true, /index.js$/))

export default store
