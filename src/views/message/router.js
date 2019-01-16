import modules from './store'
import store from '@/store'

export default [

  {
    path: '/message/:id',
    name: 'message-detail',
    component: () => import(/* webpackChunkName: "message" */'./pages/detail.vue')
  }
]

store.registerModule('message', { ...modules })
