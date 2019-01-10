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
      }
    ]
  }
]
