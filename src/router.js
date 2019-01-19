import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '@/store'
import { closeWindow } from '@/libs/bridgeUtil'
Vue.use(Router)
let routes = [{
  path: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ './views/home.vue')
}, {
  path: '/preview',
  name: 'image-preview',
  component: () => import(/* webpackChunkName: "odd" */'./components/Upload/ImagePreview.vue')
}]

// 自动注册views下所有路由
const requireContext = require.context('./views', true, /router\.js/)
requireContext.keys().forEach((filePath) => {
  const routerConfig = requireContext(filePath)
  routes = routes.concat(routerConfig.default)
})
let router = new Router({
  routes
})

// 同步store和路由
sync(store, router)

router.back = (closeTip) => {
  // 关掉一切提示,直接返回
  if (closeTip){
    // 表单返回提示
    Vue.prototype.$formWillLeave && Vue.prototype.$formWillLeave()
  }
  // 覆写router.back关闭整个webview
  if (window.history.length <= 1) {
    closeWindow({ logOut: false })
  } else {
    router.go(-1)
  }
}

export default router
