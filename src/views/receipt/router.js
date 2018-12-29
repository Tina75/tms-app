import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/receipt-list/:id',
    name: 'receipt-list',
    component: () => import(/* webpackChunkName: "user" */'./pages/list')
  },
  {
    path: '/receipt-detail/:id',
    name: 'receipt-detail',
    component: () => import(/* webpackChunkName: "user" */'./pages/detail')
  },
  {
    path: '/condition-upload/:id',
    name: 'condition-upload',
    component: () => import(/* webpackChunkName: "user" */'./pages/detail')
  }
]
store.registerModule('receipt', { ...modules })
