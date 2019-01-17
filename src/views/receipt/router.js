import modules from './store'
import store from '@/store'

export default [
  {
    path: '/receipt',
    name: 'receipt',
    component: () => import(/* webpackChunkName: "receipt" */'./pages/index.vue')
  },
  {
    path: '/receipt/detail/:id',
    name: 'receipt-detail',
    component: () => import(/* webpackChunkName: "receipt" */'./pages/detail.vue')
  },
  {
    path: '/receipt/upload',
    name: 'receipt-upload',
    component: () => import(/* webpackChunkName: "receipt" */'./pages/upload.vue')
  },
  {
    path: '/receipt/search',
    name: 'receipt-search',
    component: () => import(/* webpackChunkName: "receipt" */'./pages/search.vue')
  }
]

store.registerModule('receipt', { ...modules })
