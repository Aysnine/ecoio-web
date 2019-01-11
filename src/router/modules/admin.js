export default [
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/dashboard',
    component: () =>
      import(/* webpackChunkName: "Admin" */ '../../layout/admin'),
    children: [
      {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: () =>
          import(/* webpackChunkName: "AdminDashboard" */ '../../pages/admin/dashboard')
      },
      {
        path: '/admin/device',
        name: 'AdminDevice',
        component: () =>
          import(/* webpackChunkName: "AdminDevice" */ '../../pages/admin/device')
      },
      {
        path: '/admin/weather',
        name: 'AdminWeather',
        component: () =>
          import(/* webpackChunkName: "AdminWeather" */ '../../pages/admin/weather')
      },
      {
        path: '/admin/account',
        name: 'AdminAccount',
        component: () =>
          import(/* webpackChunkName: "AdminAccount" */ '../../pages/admin/account')
      },
      {
        path: '/admin/system',
        name: 'AdminSystem',
        component: () =>
          import(/* webpackChunkName: "AdminSystem" */ '../../pages/admin/system')
      }
    ]
  }
]
