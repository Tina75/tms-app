import { clearAppTitleBtn } from '@/libs/bridgeUtil'
import Vue from 'vue'
import router from '@/router'
import PLUGINS from './routerPlugin'
PLUGINS.forEach((plugin) => {
  if (plugin.install) {
    plugin.install(Vue)
  }
})
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
      if (ENTER_HANDLERS_LENGTH) {
        next((vm) => ENTER_HANDLERS.forEach((handler) => handler(to, from, vm)))
      } else {
        next()
      }
    } catch (e) {
      console.error(e)
    } finally {
      next()
    }
  },

  beforeRouteLeave(to, from, next) {
    if (LEAVE_HANDLERS_LENGTH) {
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
