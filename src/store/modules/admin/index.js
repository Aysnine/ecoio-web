export default {
  namespaced: true,
  getters: {
    menu: (state, getters, rootState, rootGetters) => {
      return state.menu.filter(({ role }) =>
        role ? rootGetters.userRole === role : true
      )
    }
  },
  state: {
    menu: [
      { label: '控制台', icon: 'dashboard', path: '/admin/dashboard' },
      { label: '设备管理', icon: 'device', path: '/admin/device' },
      {
        label: '用户管理',
        icon: 'account',
        path: '/admin/account',
        role: 'admin'
      },
      { label: '天气信息', icon: 'weather', path: '/admin/weather' },
      { label: '服务器', icon: 'system', path: '/admin/system', role: 'admin' }
    ]
  },
  mutations: {
    // ...
  },
  actions: {
    // ...
  }
}
