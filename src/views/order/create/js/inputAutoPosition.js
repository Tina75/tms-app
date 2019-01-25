const ua = window.navigator.userAgent
const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1

export default {
  inputFocus (e, prop) {
    if (this.inputFocusHandler) this.inputFocusHandler(e, prop)
    if (!isAndroid) return
    // 安卓键盘会导致视口高度变化
    // 延迟500ms在高度变化完成后执行调节滚动的步骤，否则无效
    setTimeout(() => {
      this.scrollToInput(e.target)
    }, 500)
  },
  scrollToInput (el) {
    this.$refs.$scroll.scroll.scrollToElement(el, 200, true, -100)
  }
}
