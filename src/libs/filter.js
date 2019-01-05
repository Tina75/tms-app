import { format } from 'date-fns'
import Vue from 'vue'

const URL_HOST = process.env.VUE_APP_IMG_HOST

Vue.filter('datetimeFormat', (value, formatting = 'YYYY-MM-DD HH:mm', placeholder = '') => {
  if (!value) return placeholder
  return format(new Date(Number(value)), formatting)
})

Vue.filter('imgUrlFormat', function (value) {
  return value ? `${URL_HOST}${value}?x-oss-process=image/resize,m_fill,h_220,w_220` : ' '
})

Vue.filter('moneyFormat', (value, accuracy) => {
  if (!value) return 0
  return (parseFloat(value) / 100).toFixed(isNaN(accuracy) ? 2 : accuracy)
})
