import store from '@/store'
import { $cookie } from '@/plugin'
import { Message } from 'element-ui'

export default [
  /* login status control */

  {
    match: '/login',
    validator: () => !!$cookie.get('token'),
    reactor: '/404'
  },
  {
    match: '/regist',
    validator: () => !!$cookie.get('token'),
    reactor: '/404'
  },
  {
    match: '/admin/**',
    validator() {
      return !$cookie.get('token')
    },
    reactor() {
      Message.warning('未登录，请先登录')
      return '/login'
    }
  },

  /* meta role control */

  {
    match: '/admin/**',
    validator({ to }) {
      let role = store.getters.userRole
      return role && to.meta && to.meta.role && to.meta.role.indexOf(role) == -1
    },
    reactor: '/404'
  },

  /* special control */

  {
    match: '/admin/account',
    validator: () => store.getters.userRole !== 'admin',
    reactor: '/404'
  }
]
