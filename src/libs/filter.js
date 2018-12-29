import { format } from 'date-fns'
import Vue from 'vue'
import { TYPE_CODES, PLOT_CODES } from '@/views/odd/js/type'

const URL_HOST = process.env.VUE_APP_IMG_HOST

Vue.filter('datetime', (value, formatting = 'YYYY-MM-DD HH:mm', placeholder = '') => {
  if (!value) return placeholder
  return format(new Date(Number(value)), formatting)
})

Vue.prototype.$formatDate = (value, formatting = 'YYYY-MM-DD HH:mm', placeholder = '') => {
  if (!value) return placeholder
  return format(new Date(Number(value)), formatting)
}

Vue.filter('imgUrlFormat', function (value) {
  return value ? `${URL_HOST}${value}?x-oss-process=image/resize,m_fill,h_220,w_220` : ' '
})

Vue.filter('moneyFormat', (value, accuracy) => {
  if (!value) return 0
  return (parseFloat(value) / 100).toFixed(isNaN(accuracy) ? 2 : accuracy)
})

// 异常环节
Vue.filter('exceptionPlot', code => {
  if (code && code < 4) { return PLOT_CODES[code - 1].text } else return '未知'
})

// 异常类型
Vue.filter('exceptionType', (plot, type) => {
  // const plotText = PLOT_CODES[plot - 1].text
  if (type < 0 || type > 7) return '未知'
  return TYPE_CODES[plot][type].text
})
