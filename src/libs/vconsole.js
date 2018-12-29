/**
 * vConsole实例注册
 * 线上隐藏
 */
import VConsole from 'vconsole'

window.vConsole = new VConsole({
  onReady () {
    /** vConsole方法显示 */
    window.vConsole.open = () => {
      window.vConsole.$.one('.vc-switch', this.$dom).style.display = 'block'
    }

    /** vConsole方法隐藏 */
    window.vConsole.close = () => {
      window.vConsole.$.one('.vc-switch', this.$dom).style.display = 'none'
    }

    if (process.env.NODE_ENV === 'production') { window.vConsole.close() }
  }
})
