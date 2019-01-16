import dayjs from 'dayjs'
import Vue from 'vue'
import City from '@/libs/city'

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
  return settlement[value] ? settlement[value] : '未知'
})

Vue.filter('codeToName', value => {
  return City.getNameByCode(value)
})

Vue.filter('orderType', value => {
  const orderTypes = { '10': '待提货', '20': '待调度', '30': '在途', '40': '已到货', '50': '已回单', '100': '已删除' }
  if (value) return orderTypes[value]
  else return '未知'
})
