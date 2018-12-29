import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */'./pages/user')
  },
  {
    path: '/name',
    name: 'user-name',
    component: () => import(/* webpackChunkName: "user" */'./pages/name')
  },
  {
    path: '/phone',
    name: 'user-phone',
    component: () => import(/* webpackChunkName: "user" */'./pages/phone')
  },
  {
    path: '/user/feedback',
    name: 'user-feedback',
    component: () => import(/* webpackChunkName: "user" */'./pages/feedback.vue')
  }
]
store.registerModule('user', { ...modules })
