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
    // 编辑发货方
    path: '/contacts/shipper/modify/:type',
    name: 'contacts-modify',
    meta: {
      noNeedRefresh: []
    },
    component: () => import(/* webpackChunkName: "contacts" */ './shipper/pages/modify.vue')
  },
    // 发货方列表
  {
    path: '/contacts/consignee',
    name: 'contacts-consignee',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/index.vue')
  },
    // 发货方详情
  {
    path: '/contacts/consignee/detail',
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
  /* 承运商 */
  {
    path: '/contacts/carrier',
    name: 'carrier',
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/index.vue')
  },
  /* 新增承运商 */
  {
    path: '/contacts/carrier/create',
    name: 'carrier-create',
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/create.vue')
  },
  /* 修改承运商 */
  {
    path: '/contacts/carrier/modify',
    name: 'carrier-modify',
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/modify.vue')
  },
  /* 承运商详情 */
  {
    path: '/contacts/carrier/detail/:id',
    name: 'carrier-detail',
    component: () => import(/* webpackChunkName: "contacts" */'./carrier/pages/detail.vue')
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
