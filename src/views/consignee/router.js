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
  },
  {
    path: '/consignee/add',
    name: 'ConsigneeAdd',
    component: () => import(/* webpackChunkName: "Consignee" */ './pages/add.vue')
  },
  {
    path: '/consignee/edit',
    name: 'ConsigneeEdit',
    component: () => import(/* webpackChunkName: "Consignee" */ './pages/add.vue')
  },
  {
    path: '/consignee/select/sender',
    name: 'SelectSender',
    component: () => import(/* webpackChunkName: "Consignee" */ './pages/selectSender.vue')
  }
]

store.registerModule('consignee', {
  ...modules
})
