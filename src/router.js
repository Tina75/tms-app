import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '@/store'

Vue.use(Router)
let router = new Router()

// 同步store和路由
sync(store, router)

// 拆包,app.js与router分离,首页加载更快,方便app.js静态缓存
import(/* webpackChunkName: "routes" */ './routes.js').then(v => {
  router.addRoutes(v.default)
})

export default router
