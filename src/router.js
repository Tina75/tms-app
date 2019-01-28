import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '@/store'

Vue.use(Router)
let routes = [{
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

export default router
