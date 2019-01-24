import { toggleTitleBar } from '@/libs/bridgeUtil'
// 表单提交状态
let $formState = {
  hasSubmitted: false,
  willLeave: () => {}
}

export default {
  install(Vue) {
    if (Vue.prototype.$formWillLeave) {
      console.error('$formWillLeave has been used')
    } else {
      Vue.prototype.$formWillLeave = (submitted = true, cb) => {
        if (typeof submitted === 'function' && !cb) {
          cb = submitted
          submitted = true
        }
        $formState.hasSubmitted = !!submitted
        if (typeof cb === 'function') $formState.willLeave = cb
        else $formState.willLeave = () => {}
      }
    }
  },
  onEnter() {
    $formState.hasSubmitted = false
  },
  onLeave(to, from, allowLeave) {
    const { formLeaveConfirm } = from.meta
    if (!formLeaveConfirm || $formState.hasSubmitted) {
      $formState.willLeave(to, from)
      return true
    }
    // 去除键盘弹窗
    if (document.activeElement) {
      document.activeElement.blur()
    }
    // android机制问题,无法检测到同一个页面标题的变化
    // 在小米或某些型号上,虽然阻止了路由跳转,但标题栏没有被还原为当前页,因此要手动出发android标题设置
    toggleTitleBar({ title: document.title })
    this.$createDialog({
      type: 'confirm',
      title: '',
      content: '信息未保存，确认退出吗？',
      icon: 'cubeic-alert',
      onConfirm: () => {
        $formState.willLeave(to, from)
        $formState.willLeave = () => {}
        allowLeave()
      }
    }).show()
  }
}
