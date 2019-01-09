export default [
  {
    path: '/order/create',
    name: 'order-create', // 受理下单
    component: () => import(/* webpackChunkName: "order" */ './pages/create.vue')
  },
  {
    path: '/order/charge-rule',
    name: 'order-charge-rule', // 计费规则
    component: () => import(/* webpackChunkName: "order" */ './pages/charge-rule.vue')
  },
  {
    path: '/order/cargo-info',
    name: 'order-cargo-info', // 货物信息
    component: () => import(/* webpackChunkName: "order" */ './pages/cargo-info.vue')
  },
  {
    path: '/order/cargo-often',
    name: 'order-cargo-often', // 选择货物
    component: () => import(/* webpackChunkName: "order" */ './pages/cargo-often.vue')
  },
  {
    path: '/order/edit-address',
    name: 'order-edit-address', // 详细地址
    component: () => import(/* webpackChunkName: "order" */ './pages/edit-address.vue')
  },
  {
    path: '/order/fee-info',
    name: 'order-fee-info', // 详细地址
    component: () => import(/* webpackChunkName: "order" */ './pages/fee-info.vue')
  }
]
