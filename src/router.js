import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import bridge from '@/libs/dsbridge'
import example from '@/views/example/router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home.vue')
    },
    ...example
  ]
})
// 同步store和路由
sync(store, router)

router.back = () => { // 覆写router.back关闭整个webview
  if (window.history.length <= 1) { bridge.call('ui.closeWindow', { logOut: false }, function (result) {}) } else { router.go(-1) }
}

export default router
