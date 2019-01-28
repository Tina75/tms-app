// -----自定义页面刷新-----
/**
 *
 * 目的: 解决列表页进入详情或编辑表单没有提交直接返回列表会导致列表刷新置顶的问题
 *
 * 在router的配置中,有noNeedRefresh选项(该页面简称为A), noNeedRefresh中的成员是路由名称(对应名称的页面简称为页面B)
 * 进入A时检测是否有onPageRefresh函数, 有则在进入时调用该实例作为页面刷新操作
 * 从B进入A时不执行onPageRefresh函数, 不刷新页面
 * 同时提供this.$refreshPage函数, 参数为路由名称, 表示下一次进入到该路由页面时执行onPageRefresh函数
  例子
  router.js:
  meta: {
      noNeedRefresh: ['contacts-shipper-detail', 'contacts-shipper-modify']
  }

  page B:
  await this.submitForm()
  this.$refreshPage('contacts-shipper-detail')
  this.$router.back()
 */
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
  onEnter(to, from) {
    const noNeedRefresh = to.meta.noNeedRefresh
    if (noNeedRefresh instanceof Array) {
      const fromName = from.name
      const toName = to.name
      try {
        if (this.onPageRefresh) {
          if (!noNeedRefresh.includes(fromName) || REFRESH_MAP[toName]) {
            this.onPageRefresh()
            REFRESH_MAP[toName] = 0
          }
        }
      } catch (e) {
        console.error('error in [plugins/routeHandler/refresh]', e)
      }
    }
  }
}
