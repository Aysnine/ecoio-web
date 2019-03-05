import Vue from 'vue'
import Vuex from 'vuex'
import dict from '@/dict'
import Plugin from '@/plugin'
const { $cookie } = Plugin
import { userLogin, userLogout, userProfile } from '@/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  /* Root */
  getters: {
    user: state => state.user,
    userRole: state => (state.user ? state.user.role : null),
    token: state => state.token
  },
  state: {
    user: null,
    token: null,
    ...dict()
  },
  mutations: {
    SET_TOKEN: (state, value) => {
      state.token = value
    },
    SET_USER: (state, value) => {
      state.user = value
    }
  },
  actions: {
    async init({ commit, dispatch }) {
      const token = $cookie.get('token') || null
      if (token) {
        commit('SET_TOKEN', token)
        try {
          await dispatch('userProfile')
          return false
        } catch (error) {
          $cookie.remove('token')
          commit('SET_TOKEN', null)
          return true
        }
      }
    },
    async userLogin({ commit, dispatch }, { account, pass }) {
      try {
        const { token } = await userLogin({ account, pass })
        $cookie.set('token', token)
        commit('SET_TOKEN', token)
        await dispatch('userProfile')
      } catch (error) {
        throw error
      }
    },
    async userProfile({ getters: { token }, commit }) {
      try {
        const { data } = await userProfile(token)
        commit('SET_USER', data)
      } catch (error) {
        throw error
      }
    },
    async userLogout({ getters: { token }, commit }) {
      try {
        await userLogout(token)
        $cookie.remove('token')
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      } catch (error) {
        throw error
      }
    }
  }
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
