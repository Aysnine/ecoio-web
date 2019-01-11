export default [
  {
    path: '/admin',
    name: 'Admin',
    meta: { title: '后台管理' },
    redirect: '/admin/dashboard',
    component: () =>
      import(/* webpackChunkName: "Admin" */ '../../layout/admin'),
    children: [
      {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        meta: { title: '控制台' },
        component: () =>
          import(/* webpackChunkName: "AdminDashboard" */ '../../pages/admin/dashboard')
      },
      {
        path: '/admin/device',
        name: 'AdminDevice',
        meta: { title: '设备管理' },
        component: () =>
          import(/* webpackChunkName: "AdminDevice" */ '../../pages/admin/device')
      },
      {
        path: '/admin/weather',
        name: 'AdminWeather',
        meta: { title: '天气信息' },
        component: () =>
          import(/* webpackChunkName: "AdminWeather" */ '../../pages/admin/weather')
      },
      {
        path: '/admin/account',
        name: 'AdminAccount',
        meta: { title: '用户管理' },
        component: () =>
          import(/* webpackChunkName: "AdminAccount" */ '../../pages/admin/account')
      },
      {
        path: '/admin/system',
        name: 'AdminSystem',
        meta: { title: '服务器' },
        component: () =>
          import(/* webpackChunkName: "AdminSystem" */ '../../pages/admin/system')
      }
    ]
  }
]
