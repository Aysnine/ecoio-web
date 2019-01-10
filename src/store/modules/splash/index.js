export default {
  namespaced: true,
  getters: {
    menu: state => [
      ...state.menu.filter(i => i.align !== 'right'),
      ...state.menu.filter(i => i.align === 'right').reverse()
    ]
  },
  state: {
    menu: [
      { img: 'logo.png', path: '/welcome' },
      { label: '注 册', path: '/regist', align: 'right' },
      { label: '登 陆', path: '/login', align: 'right' },
      { label: '进入后台', path: '/admin', align: 'right' }
    ]
  },
  mutation: {
    // ...
  },
  action: {
    // ...
  }
}
