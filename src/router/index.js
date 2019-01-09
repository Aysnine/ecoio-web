import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      redirect: '/welcome',
      component: () =>
        import(/* webpackChunkName: "Splash" */ '../layout/splash'),
      children: [
        {
          path: '/welcome',
          name: 'SplashWelcome',
          component: () =>
            import(/* webpackChunkName: "SplashWelcome" */ '../pages/splash/welcome')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      redirect: '/admin/dashboard',
      component: () =>
        import(/* webpackChunkName: "Admin" */ '../layout/admin'),
      children: [
        {
          path: '/admin/dashboard',
          name: 'AdminDashboard',
          component: () =>
            import(/* webpackChunkName: "AdminDashboard" */ '../pages/admin/dashboard')
        }
      ]
    }
  ]
})
