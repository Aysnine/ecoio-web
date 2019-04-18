export default [
  {
    path: '/spy',
    name: 'Spy',
    redirect: '/spy/lamp',
    component: () => import(/* webpackChunkName: "Spy" */ '../../layout/spy'),
    children: [
      {
        path: '/spy/lamp',
        name: 'SpyLamp',
        component: () =>
          import(/* webpackChunkName: "SpyLamp" */ '../../pages/spy/lamp')
      }
    ]
  }
]
