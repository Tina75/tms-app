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
          submitted = true
          cb = submitted
        }
        $formState.hasSubmitted = !!submitted
        if (typeof cb === 'function') $formState.willLeave = cb
      }
    }
  },
  onEnter() {
    $formState.hasSubmitted = false
    $formState.willLeave = () => {}
  },
  onLeave(to, from, next){
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
}
