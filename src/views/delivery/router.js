import modules from './store'
import store from '@/store'

export default [
  {
    path: '/delivery/list',
    name: 'delivery-list',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/list.vue')
  }
]

store.registerModule('delivery', { ...modules })
