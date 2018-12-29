import modules from './store.js'
import store from '@/store'

export default[
  {
    path: '/truck',
    name: 'truck-index',
    component: () => import(/* webpackChunkName: "truck" */'./pages/my-truck.vue')
  },
  {
    path: '/truck/number',
    name: 'truck-number',
    component: () => import(/* webpackChunkName: "truck" */'./pages/truck-number.vue')
  },
  {
    path: '/truck/:type',
    name: 'truck-detail',
    component: () => import(/* webpackChunkName: "truck" */'./pages/truck-detail.vue')
  }
]
store.registerModule('truck', { ...modules })
