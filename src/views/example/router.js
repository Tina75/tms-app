import modules from './store'
import store from '@/store'

export default [
  {
    path: '/',
    name: 'example',
    component: () => import(/* webpackChunkName: "example" */'./pages/index.vue')
  }
]

store.registerModule('example', { ...modules })
