import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/message',
    name: 'message-list',
    component: () => import(/* webpackChunkName: "message" */'./pages/message-list.vue')
  },
  {
    path: '/message/detail/:type',
    name: 'message-detail',
    component: () => import(/* webpackChunkName: "message" */'./pages/message-detail.vue')
  }
]
store.registerModule('message', { ...modules })
