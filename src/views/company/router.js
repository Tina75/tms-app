export default [
  {
    path: '/company',
    name: 'company',
    component: () => import(/* webpackChunkName: "company" */'./pages/index.vue')
  }
]
