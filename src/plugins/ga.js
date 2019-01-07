import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import VueAnalytics, { onAnalyticsReady, query } from 'vue-analytics'

// 使用GA
Vue.use(VueAnalytics, {
  id: 'UA-125825348-3', // 正式账号
  // id: 'UA-126450485-2', // 测试号
  router,
  set: [
    // { field: 'appVersion', value: store.getters.System.version },
    { field: 'hostname', value: window.location.origin }
  ],
  debug: {
    sendHitTask: process.env.VUE_APP_STATUS === 'prod'
  },
  autoTracking: {
    exception: false, // 启用自定义异常上传, 发送更完整的自定义信息
    debug: {
      enabled: process.env.VUE_APP_STATUS !== 'prod'
    },
    shouldRouterUpdate (to, from) {
      return to.path !== from.path
    },
    transformQueryString: false
  }
})

// 自定义异常信息
window.addEventListener('error', error => {
  exception(error.message)
})
const oldErrorHandler = Vue.config.errorHandler
Vue.config.errorHandler = (error, vm, info) => {
  exception(error.message)
  if (typeof oldErrorHandler === 'function') {
    oldErrorHandler.call(this, error, vm, info)
  }
}

// 在ga对象存在后调用
onAnalyticsReady().then(v => {
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/accessing-trackers
  // ready callback
  window.ga(() => {
    // 事件打点
    Vue.$ga.event({
      eventCategory: 'version',
      eventAction: store.getters.System.os,
      eventLabel: store.getters.System.version
    })
  })
})

// 自定义异常详细信息
function exception (error) {
  query('send', 'exception', {
    exDescription: `${process.env.VUE_APP_STATUS}.page: ${window.location.hash}, error: ${error.message}`,
    exFatal: false // 是否是严重事件
  })
}
