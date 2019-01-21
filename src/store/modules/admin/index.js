export default {
  namespaced: true,
  getters: {
    menu: state => state.menu
  },
  state: {
    menu: [
      { label: '控制台', icon: 'dashboard', path: '/admin/dashboard' },
      { label: '设备管理', icon: 'device', path: '/admin/device' },
      { label: '天气信息', icon: 'weather', path: '/admin/weather' },
      { label: '用户管理', icon: 'account', path: '/admin/account' },
      { label: '服务器', icon: 'system', path: '/admin/system' }
    ]
  },
  mutations: {
    // ...
  },
  actions: {
    // ...
  }
}
