import { clearAppTitleBtn } from '@/libs/bridgeUtil'
import Vue from 'vue'
import router from '@/router'
router.afterEach((to, from) => {
  // 自动清理上一个页面设置的原生按钮
  clearAppTitleBtn()
})

// -----自定义页面刷新-----
const REFRESH_MAP = {}
// 通知下一次到这个页面主动刷新
Vue.prototype.$refreshPage = (...routeNames) => routeNames.forEach((name) => (REFRESH_MAP[name] = 1))

Vue.mixin({
  // 路由跳转时根据meta里的noNeedRefresh数组决定是否调用页面实例的onPageRefresh函数
  beforeRouteEnter(to, from, next) {
    const { noNeedRefresh } = to.meta
    if (noNeedRefresh) {
      const fromName = from.name
      const toName = to.name
      next((vm) => {
        try {
          if (vm.onPageRefresh) {
            if (!noNeedRefresh.includes(fromName) || REFRESH_MAP[toName]) {
              vm.onPageRefresh()
              REFRESH_MAP[toName] = 0
            }
          }
        } catch (e) {
          console.error('error in [plugins/routeHandler]', e)
        }
      })
    } else {
      next()
    }
  },

  beforeRouteLeave (to, from, next) {
    const { formLeaveConfirm } = from.meta
    if (!formLeaveConfirm) {
      next()
      return
    }
    this.$createDialog({
      type: 'confirm',
      title: '',
      content: '信息未保存，是否确认离开？',
      icon: 'cubeic-alert',
      onConfirm: () => {
        this.formWillLeave && this.formWillLeave(to, from)
        next()
      }
    }).show()
  }
})
