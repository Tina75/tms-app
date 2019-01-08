export default [
  {
    path: '/create-order',
    name: 'createOrder',
    component: () => import(/* webpackChunkName: "create" */ './pages/index.vue')
  }
]
