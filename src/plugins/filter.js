import dayjs from 'dayjs'
import Vue from 'vue'

const URL_HOST = process.env.VUE_APP_IMG_HOST

Vue.filter('datetimeFormat', (value, formatting = 'YYYY-MM-DD HH:mm', placeholder = '') => {
  if (!value) return placeholder
  return dayjs(Number(value)).format(formatting)
})

Vue.filter('imgUrlFormat', function (value) {
  return value ? `${URL_HOST}${value}?x-oss-process=image/resize,m_fill,h_220,w_220` : ' '
})

Vue.filter('moneyFormat', (value, accuracy) => {
  if (!value) return 0
  return (parseFloat(value) / 100).toFixed(isNaN(accuracy) ? 2 : accuracy)
})

Vue.filter('settlementTypeFormat', (value) => {
  const settlement = ['未知', '现付', '到付', '回付', '月结']
  if (value > -1 && value < 4) return settlement[value]
  else return '未知'
})
