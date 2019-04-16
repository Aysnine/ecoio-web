import { fetchAccount, deleteAccount } from '@/api'

export default {
  namespaced: true,
  getters: {
    accountList: state => state.accountList
  },
  state: {
    accountList: []
  },
  mutations: {
    SET_ACCOUNT_LIST(state, value) {
      state.accountList = value
    }
  },
  actions: {
    async init({ dispatch }) {
      dispatch('fetchAccount')
    },
    async fetchAccount({ commit }) {
      try {
        const { data } = await fetchAccount()
        commit('SET_ACCOUNT_LIST', data)
        return data
      } catch (error) {
        throw error
      }
    },
    async deleteAccount({ dispatch }, id) {
      try {
        await deleteAccount(id)
        dispatch('fetchAccount')
      } catch (error) {
        throw error
      }
    }
  }
}
