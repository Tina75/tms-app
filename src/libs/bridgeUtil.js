import bridge from './dsbridge'

export const asyncUserInfo = () => {

}

// 打开app原生页面
export const openNewPage = (url, config = {}, callback = () => {}) => {
  if (url) {
    url = `${url}?${parseToStr(config.data)}`
    console.warn('openAppPage', url)
    bridge.call('navigation.openSchema', { url }, callback)
  }
}

// 关闭h5页面
export const closeWindow = () => console.info('ui.closeWindow') || bridge.call('ui.closeWindow', {}, result => {})

let appBtn = {
  right: 0
}
// 设置标题栏按钮
export const setAppTitleBtn = option => {
  const { action, position, ...config } = option
  if ('function' === typeof action) {
    let isLeft = position === 'left'
    let protocol = isLeft ? 'ui.setLeftButtonAction' : (appBtn.right = 1 && 'ui.setRightButtonAction')
    config.action = isLeft ? 'appLeftBtn_H5' : 'appRightBtn_H5'
    bridge.call(protocol, config, () => {})
    bridge.register(config.action, action, false)
    console.warn('setAppBtn: ' + protocol, config)
  }
}

// 默认清设置过的右侧按钮, 左侧按钮默认是返回键, 应该手动控制清除
export const clearAppTitleBtn = left => {
  const empty = {
    text: '',
    action: '',
    url: '',
    img: ''
  }
  const doNothing = () => {}
  if (left) {
    console.warn('clearAppBtn')
    bridge.call('ui.setLeftButtonAction', empty, doNothing)
  } else if (appBtn.right) {
    bridge.call('ui.setRightButtonAction', empty, doNothing)
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
        if (!result || !result.data || !result.data.lon || !result.data.lat || +result.data.lon === 0 || +result.data.lat === 0) {
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
export const onPageRefresh = callback => {
  bridge.register(
    'onRefreshPage',
    (...arr) => {
      callback(...arr)
    },
    false
  )
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
