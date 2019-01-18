import modules from './store'
import store from '@/store'

export default [
  {
    path: '/pickup',
    name: 'pickup',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/index.vue')
  },
  {
    path: '/pickup/dispatch',
    name: 'pickup-dispatch',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/dispatch.vue')
  },
  {
    path: '/pickup/order/detail',
    name: 'pickup-order-detail',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/order-detail.vue')
  },
  {
    path: '/pickup/order/list/:id',
    name: 'pickup-order-list',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/order-list.vue')
  },
  {
    path: '/pickup/detail/:id',
    name: 'pickup-detail',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/detail.vue')
  },
  {
    path: '/pickup/edit/:id',
    name: 'pickup-edit',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/edit.vue')
  },
  {
    path: '/pickup/assign/:id',
    name: 'pickup-assign',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/assign.vue')
  },
  {
    path: '/pickup/track',
    name: 'pickup-track',
    component: () => import(/* webpackChunkName: "pickup" */'./pages/track.vue')
  }
]

store.registerModule('pickup', { ...modules })
