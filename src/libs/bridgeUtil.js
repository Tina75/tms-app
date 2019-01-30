import bridge from './dsbridge'
import router from '@/router'
import { reuse } from './util'

export const getUserInfo = reuse(() => {
  let userInfo = {}
  if (process.env.NODE_ENV === 'production') {
    userInfo.Authorization =
      'Bearer ' + (bridge.call('user.getUserInfo') ? bridge.call('user.getUserInfo').data.token : '')
    const info = bridge.call('user.getClientInfo')
    userInfo.ClientInfo = info ? (info.data ? info.data.ClientInfo : info) : ''
  } else {
    console.warn('Authorization on mock')
    try {
      userInfo = require('./login.json')
    } catch (e) {
      userInfo = {
        Authorization: 'Bearer b34494e7d1d42cfe6081cac30c9072201548846276685',
        ClientInfo: '2240563ecfa80fe26c4eb4dd4f6053037db4eee8/yzgdriver/1.0.0/ios'
      }
    }
  }
  return userInfo
})

// 打开app原生页面
export const openNewPage = (config = {}, callback = () => {}) => {
  let { url, data, id } = config
  if (url) {
    if (data) {
      url = `${url}?${parseToStr(data)}`
    }
    if (typeof id === 'undefined') {
      console.warn('openNewPage', url)
      bridge.call('navigation.openSchema', { url }, callback)
    } else {
      console.warn('openWebview', url, id)
      bridge.call('webviews.open', { url: encodeURI(url), id }, callback)
    }
  }
}

// 关闭h5页面
export const closeWindow = (config = {}) => {
  let { id, ...others } = config
  console.info('ui.closeWindow')
  if (typeof id === 'undefined') {
    bridge.call('ui.closeWindow', others, () => {})
  } else {
    bridge.call('webviews.close', { id }, () => {})
  }
}
// 按钮类型
const type = {
  add: 'ui/ico-add.png',
  delete: 'ui/ico-delete.png',
  edit: 'ui/ico-edit.png',
  back: 'ui/ico-back.png'
}
const appBtn = {
  right: 0, // 标记设置过右侧按钮
  globalBack: 0 // 标记左侧返回按钮是否被设置
}
// 设置标题栏按钮
export const setAppTitleBtn = (option) => {
  const { action, position, iconType, ...config } = option
  if (typeof action === 'function') {
    let isLeft = position === 'left'
    let protocol = isLeft ? 'ui.setLeftButtonAction' : 'ui.setRightButtonAction'
    config.action = isLeft ? 'appLeftBtn_H5' : 'appRightBtn_H5'
    if (iconType) {
      config.url = process.env.VUE_APP_IMG_HOST + type[iconType]
    }
    if (isLeft) {
      appBtn.globalBack = 0
    } else {
      appBtn.right = 1
    }
    bridge.call(protocol, config, () => {})
    bridge.register(config.action, action, false)
    console.warn('setAppBtn: ' + protocol, config)
  }
}
// 设置标题栏右边按钮
export const setAppRightBtn = (options = []) => {
  appBtn.right = 1
  const arr = []
  if (!(options instanceof Array)) {
    options = [options]
  }
  options.forEach((option) => {
    const { action, iconType, ...config } = option
    if (typeof action === 'function') {
      config.action = iconType || 'appRightBtn_H5'
      bridge.register(config.action, action, false)
    }
    if (iconType) {
      config.url = process.env.VUE_APP_IMG_HOST + type[iconType]
    }
    arr.push(config)
  })
  console.warn('setAppBtn: ', arr)
  bridge.call('ui.setRightButtonAction', { list: arr }, () => {})
}

export const setGlobalBack = (vm) => {
  if (!appBtn.globalBack) {
    setAppTitleBtn({
      text: '返回',
      iconType: 'back',
      position: 'left',
      action: router.back
    })
    appBtn.globalBack = 1
  }
}

// 默认清设置过的右侧按钮, 左侧按钮默认是返回键, 应该手动控制清除
export const clearAppTitleBtn = (left) => {
  const empty = {
    text: '',
    action: '',
    url: '',
    img: ''
  }
  if (left) {
    console.warn('clearAppBtn')
    if (!appBtn.globalBack) {
      setGlobalBack()
    }
  } else if (appBtn.right) {
    bridge.call('ui.setRightButtonAction', empty, () => {})
    appBtn.right = 0
  }
}

// 联系客服
export const setServer = () => {
  setAppTitleBtn({
    text: '联系客服',
    action: () => {
      window.location.href = 'tel:025 66026256'
    },
    type: 'image',
    url: process.env.VUE_APP_OSS + 'demo/connect-server.png'
  })
}

/** 获取设备定位 */
export const getDeviceLocation = () => {
  return new Promise((resolve, reject) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.warn('getDeviceLocation on mock location')
        return resolve({
          lon: 118.77615985689825,
          lat: 32.02234889852933
        })
      }
      console.info('jsbridge:user.getLocationInfoAsync ')
      bridge.call('user.getLocationInfoAsync', function(result) {
        console.info('jsbridge:success ', result)
        if (
          !result ||
          !result.data ||
          !result.data.lon ||
          !result.data.lat ||
          +result.data.lon === 0 ||
          +result.data.lat === 0
        ) {
          resolve()
        }
        resolve(result.data)
      })
    } catch (e) {
      console.error('jsbridge:error ', e)
      reject(e)
    }
  })
}

/** app通知h5刷新 */
export const appCallRefresh = (callback = () => {}) => {
  bridge.register('onRefreshPage', callback, false)
}

/** 隐藏和显示标题栏 */
export const toggleTitleBar = ({ show = 1, title = '' }) => {
  console.info('toggleTitle', title)
  bridge.call('ui.showTitleBar', { show: show ? 1 : 0, title }, function(result) {})
}

// 拼成url参数
function parseToStr(data = {}) {
  return Object.keys(data)
    .reduce((total, key) => {
      if (data[key]) {
        total.push(`${key}=${data[key]}`)
      }
      return total
    }, [])
    .join('&')
}
