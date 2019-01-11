import modules from './store'
import store from '@/store'

export default [
  {
    path: '/upstream',
    name: 'upstream',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/index.vue')
  },
  {
    path: '/upstream/:id',
    name: 'upstream-detail',
    component: () => import(/* webpackChunkName: "回单tab" */'./pages/detail.vue')
  }
]

store.registerModule('upstream', { ...modules })
