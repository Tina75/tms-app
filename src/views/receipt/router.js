import modules from './store'
import store from '@/store'

export default [
  {
    path: '/receipt',
    name: 'receipt',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/index.vue')
  },
  {
    path: '/receipt/:id',
    name: 'receipt-detail',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/detail.vue')
  },
  {
    path: '/receipt/upload',
    name: 'receipt-upload',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/upload.vue')
  },
  {
    path: '/receipt/search',
    name: 'receipt-search',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/search.vue')
  }
]

store.registerModule('receipt', { ...modules })
