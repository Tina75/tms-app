export default {
  inputFocus ({ target }) {
    setTimeout(() => {
      if (this.windowIsResize) {
        this.scrollToInput(target)
      }
    }, 500)
  },
  scrollToInput (el) {
    this.$refs.$scroll.scroll.scrollToElement(el, 200)
  },
  setWindowResizeListener () {
    this.windowIsResize = false
    this.windowOriginHeight = document.documentElement.clientHeight
    window.onresize = () => {
      if (document.documentElement.clientHeight < this.windowOriginHeight) this.windowIsResize = true
      else this.windowIsResize = false
    }
  }
}
