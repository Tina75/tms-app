import axios from 'axios'
import bridge from '@/libs/dsbridge'

var userInfo = ''
var ClientInfo = ''
var getToken = function () {
  if (process.env.NODE_ENV === 'localhost') {
    return {
      Authorization: 'Bearer eyJsb2dpblRpbWUiOiIyMDE4LTEyLTI4IDExOjQyOjQ1IiwidXNlcklkIjozfQ==',
      ClientInfo: '2240563ecfa80fe26c4eb4dd4f6053037db4eee8/yzgdriver/1.0.0/ios'
    }
  } else {
    if (!userInfo || !ClientInfo) {
      userInfo = bridge.call('user.getUserInfo')
      ClientInfo = bridge.call('user.getClientInfo')
    }
    return {
      Authorization: userInfo && Number(userInfo.code) === 10000 ? `Bearer ${userInfo.data.token}` : '',
      ClientInfo: ClientInfo ? ClientInfo.data.ClientInfo : ''
    }
  }
}
var instance = axios.create({
  baseURL: process.env.VUE_APP_HOST, // 在.env.*文件中配置,
  headers: Object.assign({ 'Content-Type': 'application/json' }, getToken()),
  timeout: 10000,
  withCredentials: true,
  loading: false,
  ignoreCode: false,
  mock: false
})

instance.interceptors.request.use((config) => {
  // loading
  if (config.loading) window.loadingStart()
  if (process.env.NODE_ENV !== 'production' && (config.mock || Number(process.env.VUE_APP_IS_MOCK))) {
    config.baseURL = process.env.VUE_APP_HOST_MOCK
  }
  if (config.method === 'get' && config.data) {
    config.params = config.data
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  if (response.config.loading) window.loadingEnd()
  const resultCode = response.data.code
  if (response.config.ignoreCode || resultCode === 10000) {
    return response.data
  } else {
    // 业务逻辑错误
    switch (resultCode) {
      case 210102:
        window.alert('登录信息失效,请重新登录', logout)
        break
      case 210103:
        window.alert('帐号在别处登录,请重新登录', logout)
        break
      default:
        window.toast(response.data.msg)
        break
    }
    return Promise.reject(response)
  }
}, (error) => {
  const msg = error.message | ''
  if (msg.indexOf('Network Error')) {
    window.toast('您似乎断网了')
  } else if (msg.indexOf('timeout')) {
    window.toast('网络请求超时了')
  } else {
    window.toast(msg)
  }
  // 网络错误
  if (error) { return Promise.reject(error) }
})

function logout () {
  bridge.call('ui.closeWindow', {}, result => {})
  bridge.call(
    'navigation.openSchema',
    { url: 'yzgdriver://user/login' },
    result => {}
  )
}

export default instance
