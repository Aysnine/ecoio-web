import { fetchDevice, deleteDevice, newDevice } from '@/api'

export default {
  namespaced: true,
  getters: {
    deviceList: state => state.deviceList
  },
  state: {
    deviceList: []
  },
  mutations: {
    SET_DEVICE_LIST(state, value) {
      state.deviceList = value
    }
  },
  actions: {
    async init({ dispatch }) {
      dispatch('fetchDevice')
    },
    async fetchDevice({ commit }) {
      try {
        const { data } = await fetchDevice()
        commit('SET_DEVICE_LIST', data)
        return data
      } catch (error) {
        throw error
      }
    },
    async deleteDevice({ dispatch }, id) {
      try {
        await deleteDevice(id)
        await dispatch('fetchDevice')
      } catch (error) {
        throw error
      }
    },
    async newDevice({ dispatch }, form) {
      try {
        await newDevice(form)
        await dispatch('fetchDevice')
      } catch (error) {
        throw error
      }
    }
  }
}
