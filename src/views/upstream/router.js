import modules from './store'
import store from '@/store'

export default [
  {
    path: '/upstream',
    name: 'upstream',
    component: () => import(/* webpackChunkName: "upstream" */'./pages/index.vue')
  },
  {
    path: '/upstream/:id',
    name: 'upstream-detail',
    component: () => import(/* webpackChunkName: "upstream" */'./pages/detail.vue')
  }
]

store.registerModule('upstream', { ...modules })
