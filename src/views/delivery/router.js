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
    path: '/delivery/send-car/:id',
    name: 'delivery-send-car',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/send-car.vue')
  },
  {
    path: '/delivery/order-list/:id',
    name: 'delivery-order-list', // 运单中的订单列表
    component: () => import(/* webpackChunkName: "delivery" */'./pages/order-list.vue')
  },
  {
    path: '/delivery/detail/:id',
    name: 'delivery-detail',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/detail.vue')
  },
  {
    path: '/delivery/add-order/:id',
    name: 'delivery-add-order',
    component: () => import(/* webpackChunkName: "delivery" */'./pages/add-order.vue')
  }
]

store.registerModule('delivery', { ...modules })
