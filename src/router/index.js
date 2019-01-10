import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import splash from './modules/splash'
import admin from './modules/admin'

const routes = [
  {
    path: '/404',
    component: () => import('../pages/404/index')
  },
  ...splash,
  ...admin,
  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  routes
})
