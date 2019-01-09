import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Auto import store modules like:
 *  ./modules/[moduleName]/index.js => store.dispatch('[moduleName]')
 *  ./modules/[moduleName]/[subModuleName]/index.js => store.dispatch('[moduleName]/[subModuleName]')
 */
const modules = (r =>
  r
    .keys()
    .reduce(
      (x, key) => (
        key.match(/\/(.+)\//)[1] ? (x[key.match(/\/(.+)\//)[1]] = r(key)) : 0, x
      ),
      {}
    ))(require.context('./modules', true, /index.js$/))

export default new Vuex.Store({
  modules,

  /* Root */
  state: {},
  mutations: {},
  actions: {}
})
