import WitchSuit from '@/lib/main/witch-suit'
import { $cookie, $progress } from '@/plugin'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

const witch = WitchSuit(router)

witch.rules([
  /* base */

  {
    match: '/login',
    validator() {
      return !!$cookie.get('token')
    },
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

  /* role control */

  {
    match: '/admin/**',
    validator({ to }) {
      let role = store.getters.userRole
      return role && to.meta && to.meta.role && to.meta.role.indexOf(role) == -1
    },
    reactor: '/404'
  }
])

witch.before(() => {
  $progress.start()
})

witch.after(() => {
  $progress.done()
})

export default witch
