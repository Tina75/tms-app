import store from '@/store'
import createModule from './create/module'
import listModule from './list/store'

export default [
  {
    path: '/order/create',
    name: 'order-create', // 受理下单
    component: () => import(/* webpackChunkName: "order" */ './create/pages/index.vue')
  },
  {
    path: '/order/charge-rule',
    name: 'order-charge-rule', // 计费规则
    component: () => import(/* webpackChunkName: "order" */ './create/pages/charge-rule.vue')
  },
  {
    path: '/order/cargo-info',
    name: 'order-cargo-info', // 货物信息
    component: () => import(/* webpackChunkName: "order" */ './create/pages/cargo-info.vue')
  },
  {
    path: '/order/cargo-often',
    name: 'order-cargo-often', // 选择货物
    component: () => import(/* webpackChunkName: "order" */ './create/pages/cargo-often.vue')
  },
  {
    path: '/order/edit-address',
    name: 'order-edit-address', // 详细地址
    component: () => import(/* webpackChunkName: "order" */ './create/pages/edit-address.vue')
  },
  {
    path: '/order/fee-info',
    name: 'order-fee-info', // 详细地址
    component: () => import(/* webpackChunkName: "order" */ './create/pages/fee-info.vue')
  },
  {
    path: '/order/consumer-info',
    name: 'order-consumer-info', // 客户单号及其他
    component: () => import(/* webpackChunkName: "order" */ './create/pages/consumer-info.vue')
  },
  {
    path: '/order/other-info',
    name: 'order-other-info', // 客户单号及其他
    component: () => import(/* webpackChunkName: "order" */ './create/pages/other-info.vue')
  },
  {
    path: '/order/often',
    name: 'order-often', // 常发订单
    component: () => import(/* webpackChunkName: "order" */ './often/pages/index.vue')
  },
  {
    path: '/order/often/detail',
    name: 'order-often-detail', // 常发订单
    component: () => import(/* webpackChunkName: "order" */ './often/pages/detail.vue')
  },
  {
    path: '/order/list',
    name: 'order-list', // 订单列表
    component: () => import(/* webpackChunkName: "order" */'./list/list.vue')
  }
]

store.registerModule('order', { namespaced: true })
store.registerModule(['order', 'create'], createModule)
store.registerModule(['order', 'list'], listModule)
