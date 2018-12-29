import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/bill/waybill-detail/:billId',
    name: 'waybill-detail',
    component: () => import(/* webpackChunkName: "bill" */'./pages/waybill-detail.vue')
  },
  {
    path: '/bill/loadbill-detail/:billId',
    name: 'loadbill-detail',
    component: () => import(/* webpackChunkName: "bill" */'./pages/loadbill-detail.vue')
  },
  {
    path: '/bill/cargo-detail/:orderId',
    name: 'cargo-detail',
    component: () => import(/* webpackChunkName: "bill" */'./pages/cargo-detail.vue')
  },
  {
    path: '/bill/waybill/:billId',
    name: 'waybill-cargo-list',
    component: () => import(/* webpackChunkName: "bill" */'./pages/waybill-cargo-list.vue')
  },
  {
    path: '/bill/loadbill/:billId',
    name: 'loabill-cargo-list',
    component: () => import(/* webpackChunkName: "bill" */'./pages/loadbill-cargo-list.vue')
  }
]
store.registerModule('bill', { ...modules })
