import modules from './store'
import store from '@/store'

export default [
  {
    path: '/delivery/list',
    name: 'delivery-list',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/list.vue')
  },
  {
    path: '/delivery/workbench-multi',
    name: 'delivery-workbench-multi',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/workbench-multi.vue')
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
  },
  {
    path: '/delivery/order-list/:id',
    name: 'delivery-order-list',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/order-list.vue')
  }
]

store.registerModule('delivery', { ...modules })
