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
  onEnter(to, from) {
    $formState.hasSubmitted = false
  },
  onLeave(to, from, allowLeave) {
    const { formLeaveConfirm } = from.meta
    if (!formLeaveConfirm || $formState.hasSubmitted) {
      $formState.willLeave(to, from)
      return true
    }
    let hasOpened = false
    const formGroup = this.$refs.$form
    // 关闭所有select弹出层, 产品端木要求有打开的蒙层先关蒙层 再点击返回才返回
    if (formGroup && formGroup.closeAllSelect) {
      hasOpened = formGroup.closeAllSelect()
    }
    if (!hasOpened) {
      this.$createDialog({
        type: 'confirm',
        title: '',
        content: '信息未保存，确认退出吗？',
        // icon: 'cubeic-alert',
        onConfirm: () => {
          $formState.willLeave(to, from)
          $formState.willLeave = () => {}
          allowLeave()
          const formGroup = this.$refs.$form
          if (formGroup) {
            // 重置表单
            formGroup.reset()
          }
        }
      }).show()
    }
  }
}
