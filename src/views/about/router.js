import modules from './store'
import store from '@/store'

export default [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */'./pages/index.vue')
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: () => import(/* webpackChunkName: "about" */'./pages/introduce.vue')
  },
  {
    path: '/user-agreement',
    name: 'user-agreement',
    component: () => import(/* webpackChunkName: "about" */'./pages/user.vue')
  },
  {
    path: '/privacy-agreement',
    name: 'privacy-agreement',
    component: () => import(/* webpackChunkName: "about" */'./pages/privacy.vue')
  }
]

store.registerModule('example', { ...modules })
