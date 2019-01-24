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
