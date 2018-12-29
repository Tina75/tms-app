import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import(/* webpackChunkName: "user" */'./pages/index')
  },
  {
    path: '/company-introduce',
    name: 'company-introduce',
    component: () => import(/* webpackChunkName: "user" */'./pages/introduce')
  },
  {
    path: '/user-agreement',
    name: 'user-agreement',
    component: () => import(/* webpackChunkName: "user" */'./pages/agreement')
  }
]
store.registerModule('about', { ...modules })
