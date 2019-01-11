import modules from './store'
import store from '@/store'

export default [
  {
    path: '/receipt',
    name: 'receipt',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/index.vue')
  }
]

store.registerModule('receipt', { ...modules })
