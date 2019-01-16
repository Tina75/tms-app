import store from '@/store'
export default [
  // -------发货方-----------
  {
    // 发货方通信录
    path: '/contacts/shipper',
    name: 'contacts-shipper',
    meta: {
      noNeedRefresh: ['contacts-shipper-detail']
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/index.vue')
  },
  {
    // 发货方详情
    path: '/contacts/shipper/detail',
    name: 'contacts-shipper-detail',
    meta: {
      noNeedRefresh: ['contacts-shipper-modify']
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/detail.vue')
  },
  {
    // 编辑发货方
    path: '/contacts/shipper/modify',
    name: 'contacts-shipper-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/modify.vue')
  },
  {
    // 发货方地址列表 ?consignerId
    path: '/contacts/shipper/address',
    name: 'contacts-shipper-address',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/address.vue')
  },
  {
    // 编辑发货方地址
    path: '/contacts/shipper/address/modify',
    name: 'contacts-shipper-address-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/address-modify.vue')
  },
  {
    // 发货方常发货列表 ?consignerId
    path: '/contacts/shipper/cargo',
    name: 'contacts-shipper-cargo',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/cargo.vue')
  },
  {
    // 编辑发货方常发货
    path: '/contacts/shipper/cargo/modify',
    name: 'contacts-shipper-cargo-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts-shipper" */ './shipper/pages/cargo-modify.vue')
  },
  // -------------收货方------------------
  // 收货方列表
  {
    path: '/contacts/consignee',
    name: 'contacts-consignee',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/index.vue')
  },
  // 收货方详情
  {
    path: '/contacts/consignee/detail',
    name: 'contacts-consignee-detail',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/detail.vue')
  },
  // 编辑和新增发货方
  {
    path: '/contacts/consignee/modify',
    name: 'contacts-consignee-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/modify.vue')
  },
  // 选择所属发货方
  {
    path: '/contacts/consignee/select/shipper',
    name: 'select-shipper',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/select-shipper.vue')
  },
  // 熟车司机列表
  {
    path: '/contacts/driver',
    name: 'contacts-driver',
    component: () => import(/* webpackChunkName: "contacts" */ './driver/pages/index.vue')
  },
  // 熟车司机详情
  {
    path: '/contacts/driver/detail',
    name: 'contacts-driver-detail',
    component: () => import(/* webpackChunkName: "contacts" */ './driver/pages/detail.vue')
  },
  /* 承运商 */
  {
    path: '/contacts/driver/modify',
    name: 'contacts-driver-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/truck-create.vue')
  },
  {
    path: '/contacts/driver/detail',
    name: 'contacts-driver-detail',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/truck-detail.vue')
  },
  /* 承运商 */
  {
    path: '/contacts/carrier',
    name: 'contacts-carrier',
    meta: {
      noNeedRefresh: ['contacts-carrier-detail']
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/index.vue')
  },
  /* 修改/新增 承运商 */
  {
    path: '/contacts/carrier/modify',
    name: 'contacts-carrier-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/create.vue')
  },
  /* 承运商详情 */
  {
    path: '/contacts/carrier/detail/:id',
    name: 'contacts-carrier-detail',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/detail.vue')
  },
  /* 承运商合作车辆 */
  {
    path: '/contacts/carrier/truck',
    name: 'contacts-carrier-truck',
    meta: {
      noNeedRefresh: ['contacts-carrier-truck-detail']
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/truck.vue')
  },
  {
    path: '/contacts/carrier/truck/modify',
    name: 'contacts-carrier-truck-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/truck-create.vue')
  },
  {
    path: '/contacts/carrier/truck/detail',
    name: 'contacts-carrier-truck-detail',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/truck-detail.vue')
  }
]

store.registerModule('contacts', {
  namespaced: true
})

// 动态读取当前目录下所有子文件下的store.js进行注册, 注册模块名为文件名
const requireContext = require.context('./', true, /store\.js/)
requireContext.keys().forEach((filePath) => {
  const moduleName = filePath.match(/\.\/(\w+)\//)[1]
  const moduleStore = requireContext(filePath)
  store.registerModule(['contacts', moduleName], moduleStore.default)
})
