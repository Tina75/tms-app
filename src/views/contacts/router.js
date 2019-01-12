import store from '@/store'
export default [
  {
  // 发货方通信录
    path: '/contacts/shipper',
    name: 'contacts-shipper',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './shipper/pages/index.vue')
  },
  {
    // 发货方详情
    path: '/contacts/shipper/detail/:id',
    name: 'contacts-shipper-detail',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './shipper/pages/detail.vue')
  },
  {
    // 编辑发货方
    path: '/contacts/shipper/modify',
    name: 'contacts-shipper-modify',
    component: () => import(/* webpackChunkName: "contacts" */ './shipper/pages/modify.vue')
  },
  // 发货方列表
  {
    path: '/contacts/consignee',
    name: 'contacts-consignee',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/index.vue')
  },
  // 发货方详情
  {
    path: '/contacts/consignee/detail/:id',
    name: 'contacts-consignee-detail',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/detail.vue')
  },
  // 编辑和新增发货方
  {
    path: '/contacts/consignee/form/:type',
    name: 'contacts-consignee-form',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/form.vue')
  },
  // 选择所属发货方
  {
    path: '/contacts/consignee/select/shipper',
    name: 'select-shipper',
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
    path: '/contacts/driver/detail/:id',
    name: 'contacts-driver-detail',
    component: () => import(/* webpackChunkName: "contacts" */ './driver/pages/detail.vue')
  },
  /* 承运商 */
  {
    path: '/contacts/carrier',
    name: 'Carrier',
    component: () => import(/* webpackChunkName: "carrier" */ './carrier/pages/index.vue')
  },
  /* 新增承运商 */
  {
    path: '/contacts/carrier/create',
    name: 'CarrierCreate',
    component: () => import(/* webpackChunkName: "carrier" */ './carrier/pages/create.vue')
  },
  /* 修改承运商 */
  {
    path: '/contacts/carrier/modify',
    name: 'CarrierModify',
    component: () => import(/* webpackChunkName: "carrier" */ './carrier/pages/modify.vue')
  },
  /* 承运商详情 */
  {
    path: '/contacts/carrier/detail/:id',
    name: 'CarrierDetail',
    component: () => import(/* webpackChunkName: "carrier" */ './carrier/pages/detail.vue')
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
