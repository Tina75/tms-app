import modules from './store'
import store from '@/store'

export default [
  {
    path: '/',
    name: 'company',
    component: () => import(/* webpackChunkName: "company" */'./pages/index.vue')
  }
]

store.registerModule('company', { ...modules })
