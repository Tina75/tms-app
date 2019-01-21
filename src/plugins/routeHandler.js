import { setAppTitleBtn, clearAppTitleBtn, closeWindow } from '@/libs/bridgeUtil'
import Vue from 'vue'
import router from '@/router'
import PLUGINS from './routerPlugin'

PLUGINS.forEach((plugin) => {
  if (plugin.install) {
    plugin.install(Vue)
  }
})

let globalHistory = 1
const push = router.push
router.push = (...args) => {
  globalHistory++
  console.log(history)
  push.apply(router, args)
}
router.back = (closeTip) => {
  // 关掉一切提示,直接返回
  if (closeTip) {
    // 表单返回提示
    Vue.prototype.$formWillLeave && Vue.prototype.$formWillLeave()
  }
  // 覆写router.back关闭整个webview
  if (globalHistory === 1) {
    closeWindow({ logOut: false })
  } else {
    router.go(-1)
  }
}
window.onpopstate = () => { globalHistory-- }

router.afterEach((to, from) => {
  // 自动清理上一个页面设置的原生按钮
  clearAppTitleBtn()
})
/// ------全局劫持-----
const ENTER_HANDLERS = getHandlerArr(PLUGINS, 'onEnter')
const ENTER_HANDLERS_LENGTH = ENTER_HANDLERS.length
const LEAVE_HANDLERS = getHandlerArr(PLUGINS, 'onLeave')
const LEAVE_HANDLERS_LENGTH = LEAVE_HANDLERS.length

Vue.mixin({
  // 若需求要在plugin中阻止next调用,请在onLeave时阻止
  beforeRouteEnter(to, from, next) {
    try {
      next((vm) => {
        setGlobalBack(vm)
        if (ENTER_HANDLERS_LENGTH) {
          ENTER_HANDLERS.forEach((handler) => handler(to, from, vm))
        }
      })
    } catch (e) {
      console.error(e)
    } finally {
      next((vm) => { setGlobalBack(vm) })
    }
  },

  beforeRouteLeave(to, from, next) {
    if (LEAVE_HANDLERS_LENGTH) {
      next(false)
      const nextProxy = countToGo(LEAVE_HANDLERS_LENGTH, next)
      for (let i = 0; i < LEAVE_HANDLERS_LENGTH; i++) {
        LEAVE_HANDLERS[i].call(this, to, from, nextProxy)
      }
    } else {
      next()
    }
  }
})

function countToGo(num, callback) {
  let count = 0
  return function() {
    count++
    if (count === num) {
      callback()
    }
  }
}

function getHandlerArr(target, key) {
  return target.reduce((arr, plugin) => {
    if (plugin[key]) {
      arr.push(plugin[key])
    }
    return arr
  }, [])
}

function setGlobalBack (vm) {
  setAppTitleBtn({
    text: '返回',
    position: 'left',
    action: () => {
      vm.$router.back()
    }
  })
}
