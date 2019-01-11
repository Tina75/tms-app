import { clearAppTitleBtn } from '@/libs/bridgeUtil'
import Vue from 'vue'
import router from '@/router'
router.afterEach((to, from) => {
  // 自动清理上一个页面设置的原生按钮
  clearAppTitleBtn()
})
Vue.mixin({
  // 路由跳转时根据meta里的noNeedRefresh数组决定是否调用页面实例的onPageRefresh函数
  beforeRouteEnter(to, from, next) {
    const meta = to.meta
    if (meta.noNeedRefresh) {
      next((vm) => {
        if (vm.onPageRefresh && !meta.noNeedRefresh.includes(from.name)) {
          vm.onPageRefresh()
        }
      })
    } else {
      next()
    }
  }
})
