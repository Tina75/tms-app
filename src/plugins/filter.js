import dayjs from 'dayjs'
import Vue from 'vue'
import City from '@/libs/city'
import NP from 'number-precision'

const URL_HOST = process.env.VUE_APP_IMG_HOST

Vue.filter('datetimeFormat', (value, formatting = 'YYYY-MM-DD HH:mm', placeholder = '') => {
  if (!value) return placeholder
  return dayjs(Number(value)).format(formatting)
})

Vue.filter('imgUrlFormat', function (value) {
  if (value.indexOf('aliyuncs.com') > 0) return value
  return value ? `${URL_HOST}${value}?x-oss-process=image/resize,m_fill,h_220,w_220` : ' '
})

/**
 * 金额格式化
 *  value 金额，以分为单位
 */
Vue.filter('moneyFormat', function (value, num = 2) {
  // value = value / 100 // 转换为元
  // num = num || 2
  // if (parseFloat(value) > 0) {
  //   var str = parseFloat(value).toFixed(num)
  //   str = str.split('.')
  //   var start = parseFloat(str[0]).toString()
  //   return (str[1] === '00') ? (start) : (start + '.' + (str[1] || ''))
  // } else {
  //   return 0
  // }
  if (!value) return '0'
  return NP.divide(value, Math.pow(10, num))
})

/**
 * 里程格式化
 *  value 以米为单位
 */
Vue.filter('mileageFormat', function (value, num = 3) {
  if (!value) return ''
  return NP.divide(value, Math.pow(10, num))
})

Vue.filter('settlementTypeFormat', (value) => {
  const settlement = ['未知', '现付', '到付', '回付', '月结']
  return settlement[value] ? settlement[value] : '未知'
})

Vue.filter('codeToName', value => {
  return City.getNameByCode(value)
})

Vue.filter('orderType', value => {
  const orderTypes = { '10': '待提货', '20': '待送货', '30': '在途', '40': '已到货', '50': '已回单', '100': '已删除' }
  if (value) return orderTypes[value]
  else return '未知'
})

Vue.directive('imgFormat', function (el, binding) {
  if (!binding.value) return
  if (binding.value.indexOf('aliyuncs.com') > 0) return
  el.style.backgroundImage = 'url(' + `${URL_HOST}${binding.value}?x-oss-process=image/resize,m_fill,h_220,w_220` + ')'
})
Vue.filter('billType', value => {
  const billTypes = { '1': '待派车', '2': '待发运', '3': '在途', '4': '已到货' }
  if (value) return billTypes[value]
  else return '未知'
})

Vue.filter('payType', value => {
  const billTypes = { '1': '预付', '2': '到付', '3': '回付', '4': '尾付' }
  if (value) return billTypes[value]
  else return '未知'
})

Vue.filter('carType', value => {
  const types = { 1: '平板', 2: '高栏', 3: '厢车', 4: '自卸', 5: '冷藏', 6: '保温', 7: '高低板', 8: '面包车', 9: '爬梯车', 10: '飞翼车', 11: '罐车' }
  return types[value]
})
