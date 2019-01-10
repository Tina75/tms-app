import modules from './modules/store'
import store from '@/store'

export default [
  {
    path: '/carrier/index',
    name: 'carrier_index',
    component: () => import(/* webpackChunkName: "carrier" */'./pages/index.vue')
  },
  /* 新增承运商 */
  {
    path: '/carrier/create',
    name: 'carrier_create',
    component: () => import(/* webpackChunkName: "carrier" */'./pages/create.vue')
  },
  /* 修改承运商 */
  {
    path: '/carrier/modify',
    name: 'carrier_modify',
    component: () => import(/* webpackChunkName: "carrier" */'./pages/modify.vue')
  },
  /* 承运商详情 */
  {
    path: '/carrier/detail/:id',
    name: 'carrier_detail',
    component: () => import(/* webpackChunkName: "carrier" */'./pages/detail.vue')
  }
  // /* 合作车辆 */
  // {
  //   path: '/carrier/truck',
  //   name: 'carrier_car',
  //   component: () => import(/* webpackChunkName: "carrier" */'./pages/car.vue')
  // },
  // /* 新增车辆 */
  // {
  //   path: '/carrier/newTruck',
  //   name: 'carrier_newCar',
  //   component: () => import(/* webpackChunkName: "carrier" */'./pages/newCar.vue')
  // },
  // /* 车辆详情 */
  // {
  //   path: '/carrier/truck',
  //   name: 'carrier_car',
  //   component: () => import(/* webpackChunkName: "carrier" */'./pages/car.vue')
  // }
]

store.registerModule('carrier', { ...modules })
