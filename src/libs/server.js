import axios from 'axios'
import { getUserInfo, openNewPage, closeWindow } from './bridgeUtil'

var instance = axios.create({
  baseURL: process.env.VUE_APP_HOST, // 在.env.*文件中配置,
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000,
  withCredentials: true,
  loading: false,
  ignoreCode: false,
  mock: false
})

instance.interceptors.request.use(
  (config) => {
    // 取实时的认证信息
    Object.assign(config.headers, getUserInfo())
    // loading
    if (config.loading) window.loading()
    if (process.env.NODE_ENV !== 'production' && (config.mock || Number(process.env.VUE_APP_IS_MOCK))) {
      config.baseURL = process.env.VUE_APP_HOST_MOCK
    }
    if (config.method === 'get' && config.data) {
      config.params = config.data
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.config.loading) window.loading(false)
    const resultCode = response.data.code
    if (response.config.ignoreCode || resultCode === 10000) {
      return response.data
    } else {
      // 业务逻辑错误
      switch (resultCode) {
        case 210102:
          window.alert('用户授权过期,请重新登录', logout)
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
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '用户授权过期,请重新登陆'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        default:
          error.message = `连接错误${error.response.status}`
          break
      }
    } else {
      if (error.message.indexOf('Network Error') !== -1) {
        error.message = '您似乎断网了'
      } else if (error.message.indexOf('timeout') !== -1) {
        error.message = '网络请求超时了'
      }
    }
    window.toast(error.message)
    return Promise.reject(error)
  }
)

function logout() {
  openNewPage({ url: 'yzgdriver://user/login' }, closeWindow)
}

export default instance
