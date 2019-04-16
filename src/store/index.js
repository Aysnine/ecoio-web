import Vue from 'vue'
import Vuex from 'vuex'
import dict from '@/dict'
import { $cookie } from '@/plugin'
import {
  userRegist,
  userLogin,
  userLogout,
  userProfile,
  updateData
} from '@/api'
import { get } from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  /* Root */
  getters: {
    user: state => state.user,
    userAccount: state => get(state, 'user.account'),
    userRole: state => get(state, 'user.role'),
    userNickname: state => get(state, 'user.nickname'),
    userId: state => get(state, 'user.id'),
    token: state => state.token,
    devices: state => get(state, 'user.data.devices.devices', []),
    weathers: state => get(state, 'user.data.devices.weathers', [])
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
    async userRegist(_, { account, nickname, pass }) {
      try {
        const rst = await userRegist({ account, nickname, pass })
        return rst
      } catch (error) {
        throw error
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
    async userProfile({ commit }) {
      try {
        const { data } = await userProfile()
        commit('SET_USER', data)
      } catch (error) {
        throw error
      }
    },
    async userLogout({ commit }) {
      try {
        await userLogout()
        $cookie.remove('token')
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      } catch (error) {
        throw error
      }
    },
    async updateData({ dispatch }, data) {
      try {
        await updateData(data)
        await dispatch('userProfile')
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
