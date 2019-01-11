import modules from './store'
import store from '@/store'

export default [
  {
    path: '/delivery/list',
    name: 'delivery-list',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/list.vue')
  },
  {
    path: '/delivery/workbench',
    name: 'delivery-workbench',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/workbench.vue')
  },
  {
    path: '/delivery/send-car',
    name: 'delivery-send-car',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/send-car.vue')
  }
]

store.registerModule('delivery', { ...modules })
