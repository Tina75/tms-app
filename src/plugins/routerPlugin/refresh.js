// -----自定义页面刷新-----
const REFRESH_MAP = {}
// 通知下一次到这个页面主动刷新
export default {
  install(Vue) {
    if (Vue.prototype.$refreshPage) {
      console.error('$refreshPage has been used')
    } else {
      Vue.prototype.$refreshPage = (...routeNames) => routeNames.forEach((name) => (REFRESH_MAP[name] = 1))
    }
  },
  onEnter(to, from, vm) {
    const noNeedRefresh = to.meta.noNeedRefresh
    if (noNeedRefresh instanceof Array) {
      const fromName = from.name
      const toName = to.name
      try {
        if (vm.onPageRefresh) {
          if (!noNeedRefresh.includes(fromName) || REFRESH_MAP[toName]) {
            vm.onPageRefresh()
            REFRESH_MAP[toName] = 0
          }
        }
      } catch (e) {
        console.error('error in [plugins/routeHandler/refresh]', e)
      }
    }
  }
}
