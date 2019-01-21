import store from '@/store'
import createModule from './create/module'
import listModule from './list/store'
import oftenModule from './often/store'
import detailModule from './detail/store'

export default [
  {
    path: '/order/create',
    name: 'order-create', // 手工开单
    meta: {
      mode: 'create',
      title: '手工开单',
      formLeaveConfirm: true
    },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/index.vue')
  },
  {
    path: '/order/more/:id',
    name: 'order-one-more', // 再来一单
    meta: {
      mode: 'oneMore',
      title: '再来一单',
      formLeaveConfirm: true
    },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/index.vue')
  },
  {
    path: '/order/edit/:id',
    name: 'order-edit', // 编辑订单
    meta: {
      mode: 'edit',
      title: '编辑订单',
      formLeaveConfirm: true
    },
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
    meta: { formLeaveConfirm: true },
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
    meta: { formLeaveConfirm: true },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/edit-address.vue')
  },
  {
    path: '/order/fee-info',
    name: 'order-fee-info', // 其他费用
    meta: { formLeaveConfirm: true },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/fee-info.vue')
  },
  {
    path: '/order/consumer-info',
    name: 'order-consumer-info', // 客户单号及其他
    meta: { formLeaveConfirm: true },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/consumer-info.vue')
  },
  {
    path: '/order/other-info',
    name: 'order-other-info', // 其他信息
    meta: { formLeaveConfirm: true },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/other-info.vue')
  },
  {
    path: '/order/select-consigner',
    name: 'order-select-consigner', // 选择发货人
    meta: { noNeedRefresh: [] },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/select-consigner.vue')
  },
  {
    path: '/order/select-consignee',
    name: 'order-select-consignee', // 选择收货人
    meta: { noNeedRefresh: [] },
    component: () => import(/* webpackChunkName: "order" */ './create/pages/select-consignee.vue')
  },
  {
    path: '/order/often',
    name: 'order-often', // 常发订单
    meta: { noNeedRefresh: [] },
    component: () => import(/* webpackChunkName: "order" */ './often/pages/index.vue')
  },
  {
    path: '/order/often/detail/:orderId',
    name: 'order-often-detail', // 常发订单详情
    component: () => import(/* webpackChunkName: "order" */ './often/pages/detail.vue')
  },
  {
    path: '/order/list',
    name: 'order-list', // 订单列表
    component: () => import(/* webpackChunkName: "order" */'./list/pages/list.vue')
  },
  {
    path: '/order/detail/:id',
    name: 'order-detail', // 订单列表
    component: () => import(/* webpackChunkName: "order" */'./detail/pages/detail.vue')
  }
]

store.registerModule('order', { namespaced: true })
store.registerModule(['order', 'create'], createModule)
store.registerModule(['order', 'list'], listModule)
store.registerModule(['order', 'often'], oftenModule)
store.registerModule(['order', 'detail'], detailModule)
