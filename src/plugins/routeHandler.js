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

let ENTER_HANDLERS = PLUGINS.reduce((arr, plugin) => {
  if (plugin.onEnter) {
    arr.push(plugin.onEnter)
  }
  return arr
}, [])
const LEAVE_HANDLERS = PLUGINS.reduce((arr, plugin) => {
  if (plugin.onLeave) {
    arr.push(plugin.onLeave)
  }
  return arr
}, [])
const LEAVE_HANDLER_LENGTH = LEAVE_HANDLERS.length

Vue.mixin({
  // 若需求要在plugin中阻止next调用,请在onLeave时阻止
  beforeRouteEnter(to, from, next) {
    try {
      if (ENTER_HANDLERS.length) {
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
    if (LEAVE_HANDLER_LENGTH) {
      let count = 0
      const nextProxy = () => {
        count++
        if (count === LEAVE_HANDLER_LENGTH) {
          next()
        }
      }
      for (let i = 0, len = LEAVE_HANDLERS.length; i < len; i++) {
        LEAVE_HANDLERS[i].call(this, to, from, nextProxy)
      }
    } else {
      next()
    }
  }
})
