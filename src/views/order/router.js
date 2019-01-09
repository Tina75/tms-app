export default [
  {
    path: '/order/create',
    name: 'create-order',
    component: () => import(/* webpackChunkName: "order" */ './pages/create.vue')
  }
]
