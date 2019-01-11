export default {
  namespaced: true,
  getters: {
    menu: state => state.menu
  },
  state: {
    menu: [
      { label: '控制台', path: '/admin/dashboard' },
      { label: '设备管理', path: '/admin/device' },
      { label: '天气信息', path: '/admin/weather' },
      { label: '用户管理', path: '/admin/account' },
      { label: '服务器', path: '/admin/system' }
    ]
  },
  mutation: {
    // ...
  },
  action: {
    // ...
  }
}
