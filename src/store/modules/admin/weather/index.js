export default {
  namespaced: true,
  getters: {
    // ...
  },
  state: {
    // ...
  },
  mutations: {
    // ...
  },
  actions: {
    async fetchWeatherInfo() {
      try {
        return { hello: 'world' }
      } catch (error) {
        // throw error
      }
    }
  }
}
