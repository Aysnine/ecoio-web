export default [
  {
    path: '',
    name: 'Splash',
    redirect: '/welcome',
    component: () =>
      import(/* webpackChunkName: "Splash" */ '../../layout/splash'),
    children: [
      {
        path: '/welcome',
        name: 'SplashWelcome',
        component: () =>
          import(/* webpackChunkName: "SplashWelcome" */ '../../pages/splash/welcome')
      },
      {
        path: '/login',
        name: 'SplashLogin',
        component: () =>
          import(/* webpackChunkName: "SplashLogin" */ '../../pages/splash/login')
      },
      {
        path: '/regist',
        name: 'SplashRegist',
        component: () =>
          import(/* webpackChunkName: "SplashRegist" */ '../../pages/splash/regist')
      }
    ]
  }
]
