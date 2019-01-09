import modules from './modules/store'
import store from '@/store'

export default [
  {
    path: '/consignee',
    name: 'Consignee',
    component: () => import(/* webpackChunkName: "Consignee" */ './pages/index.vue')
  },
  {
    path: '/consignee/detail',
    name: 'ConsigneeDetail',
    component: () => import(/* webpackChunkName: "Consignee" */ './pages/detail.vue')
  }
]

store.registerModule('consignee', {
  ...modules
})
