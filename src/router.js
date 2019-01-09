import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import { closeWindow } from '@/libs/bridgeUtil'
import example from '@/views/example/router'
import delivery from '@/views/delivery/router'

import order from '@/views/order/router'
import company from '@/views/company/router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue')
    },
    ...delivery,
    ...example,

    ...order,

    ...company
  ]
})
// 同步store和路由
sync(store, router)

router.back = () => {
  // 覆写router.back关闭整个webview
  if (window.history.length <= 1) {
    closeWindow({ logOut: false })
  } else {
    router.go(-1)
  }
}

export default router
