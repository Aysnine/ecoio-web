export default {
  namespaced: true,
  getters: {
    menu: (state, getters, rootState, rootGetters) =>
      [
        ...state.menu.filter(i => i.align !== 'right'),
        ...state.menu.filter(i => i.align === 'right').reverse()
      ].filter(({ mustLogin, mustNotLogin }) =>
        rootGetters.user ? !!mustLogin : !!mustNotLogin
      )
  },
  state: {
    menu: [
      { img: 'logo.png', path: '/welcome' },
      { label: '注 册', path: '/regist', align: 'right', mustNotLogin: true },
      { label: '登 陆', path: '/login', align: 'right', mustNotLogin: true },
      { label: '进入后台', path: '/admin', align: 'right', mustLogin: true }
    ]
  },
  mutation: {
    // ...
  },
  action: {
    // ...
  }
}
