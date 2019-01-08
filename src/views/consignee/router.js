import modules from './modules/store'
import store from '@/store'

export default [
  {
    path: '/consignee',
    name: 'Consignee',
    component: () => import(/* webpackChunkName: "Consignee" */ './pages/index.vue')
  }
]

store.registerModule('consignee', {
  ...modules
})
