import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import bridge from '@/libs/dsbridge'
import example from '@/views/example/router'
import bill from '@/views/bill/router'
import user from '@/views/user/router'
import about from '@/views/about/router'
import odd from '@/views/odd/router'
import receipt from '@/views/receipt/router'

import message from '@/views/message/router'
import truck from '@/views/truck/router'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue')
    },
    ...example,
    ...bill,
    ...user,
    ...odd,
    ...about,
    ...receipt,
    ...message,
    ...truck
  ]
})
// 同步store和路由
sync(store, router)

router.back = () => {
  if (window.history.length <= 1) {
    bridge.call('ui.closeWindow', { logOut: false }, function (result) {})
  } else {
    router.go(-1)
  }
}

export default router
