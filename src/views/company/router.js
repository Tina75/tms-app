import modules from './store'
import store from '@/store'

export default [
  {
    path: '/company',
    name: 'company',
    component: () => import(/* webpackChunkName: "company" */'./pages/show.vue')
  },
  {
    path: '/company/edit',
    name: 'company-edit',
    component: () => import(/* webpackChunkName: "company" */'./pages/edit.vue')
  }
]

store.registerModule('company', { ...modules })
