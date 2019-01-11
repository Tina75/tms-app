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
  {
    path: '/contacts/consignee',
    name: 'Consignee',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/index.vue')
  },
  {
    path: '/contacts/consignee/detail',
    name: 'ConsigneeDetail',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/detail.vue')
  },
  {
    path: '/contacts/consignee/add',
    name: 'ConsigneeAdd',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/add.vue')
  },
  {
    path: '/contacts/consignee/edit',
    name: 'ConsigneeEdit',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/add.vue')
  },
  {
    path: '/contacts/consignee/select/sender',
    name: 'SelectSender',
    component: () => import(/* webpackChunkName: "contacts" */ './consignee/pages/selectSender.vue')
  },
  /* 承运商 */
  {
    path: '/contacts/carrier',
    name: 'Carrier',
    component: () => import(/* webpackChunkName: "carrier" */'./carrier/pages/index.vue')
  },
  /* 新增承运商 */
  {
    path: '/contacts/carrier/create',
    name: 'CarrierCreate',
    component: () => import(/* webpackChunkName: "carrier" */'./carrier/pages/create.vue')
  },
  /* 修改承运商 */
  {
    path: '/contacts/carrier/modify',
    name: 'CarrierModify',
    component: () => import(/* webpackChunkName: "carrier" */'./carrier/pages/modify.vue')
  },
  /* 承运商详情 */
  {
    path: '/contacts/carrier/detail/:id',
    name: 'CarrierDetail',
    component: () => import(/* webpackChunkName: "carrier" */'./carrier/pages/detail.vue')
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
