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
// 表单提交状态
let $formState = {
  hasSubmitted: false,
  willLeave: () => {}
}
/**
 * submitted 表单提交状态 默认true
 * cb 对应状态页面离开时的回调，接收 to from 作为参数
 */
Vue.prototype.$formWillLeave = (submitted = true, cb) => {
  $formState.hasSubmitted = !!submitted
  if (typeof cb === 'function') $formState.willLeave = cb
}
Vue.mixin({
  // 路由跳转时根据meta里的noNeedRefresh数组决定是否调用页面实例的onPageRefresh函数
  beforeRouteEnter(to, from, next) {
    $formState.hasSubmitted = false
    $formState.willLeave = () => {}
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
    if (!formLeaveConfirm || $formState.hasSubmitted) {
      $formState.willLeave(to, from)
      next()
      return
    }
    this.$createDialog({
      type: 'confirm',
      title: '',
      content: '信息未保存，是否确认离开？',
      icon: 'cubeic-alert',
      onConfirm: () => {
        $formState.willLeave(to, from)
        next()
      }
    }).show()
  }
})
