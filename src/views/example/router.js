import modules from './store'
import store from '@/store'

export default [
  {
    path: '/example',
    name: 'example',
    component: () => import(/* webpackChunkName: "example" */'./pages/index.vue')
  }
]

store.registerModule('example', { ...modules })
