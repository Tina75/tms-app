import dayjs from 'dayjs'
import Vue from 'vue'
import NP from 'number-precision'
import City from '@/libs/city'

const URL_HOST = process.env.VUE_APP_IMG_HOST

Vue.filter('datetimeFormat', (value, formatting = 'YYYY-MM-DD HH:mm', placeholder = '') => {
  if (!value) return placeholder
  return dayjs(Number(value)).format(formatting)
})

Vue.filter('imgUrlFormat', function (value) {
  if (value.indexOf('aliyuncs.com') > 0) return value
  return value ? `${URL_HOST}${value}?x-oss-process=image/resize,m_fill,h_220,w_220` : ' '
})

Vue.filter('moneyFormat', (value) => {
  if (!value) return 0
  return NP.divide(parseFloat(value), 100)
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

Vue.directive('imgFormat', function (el, binding) {
  if (!binding.value) return
  if (binding.value.indexOf('aliyuncs.com') > 0) return
  el.style.backgroundImage = 'url(' + `${URL_HOST}${binding.value}?x-oss-process=image/resize,m_fill,h_220,w_220` + ')'
})
