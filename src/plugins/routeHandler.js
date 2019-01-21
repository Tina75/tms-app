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
let backFlag = false
const push = router.push
router.push = (...args) => {
  globalHistory++
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
    backFlag = true
    router.go(-1)
  }
}

router.afterEach((to, from) => {
  // 自动清理上一个页面设置的原生按钮
  clearAppTitleBtn()
})
/// ------全局劫持-----
const ENTER_HANDLERS = getHandlerArr(PLUGINS, 'onEnter')
const ENTER_HANDLERS_LENGTH = ENTER_HANDLERS.length
const LEAVE_HANDLERS = getHandlerArr(PLUGINS, 'onLeave')
const LEAVE_HANDLERS_LENGTH = LEAVE_HANDLERS.length
let noJudge = false
Vue.mixin({
  // 若需求要在plugin中阻止next调用,请在onLeave时阻止
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      try {
        setGlobalBack(vm)
        if (ENTER_HANDLERS_LENGTH) {
          ENTER_HANDLERS.forEach((handler) => handler(to, from, vm))
        }
      } catch (e) {
        console.error(e)
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    if (noJudge || !LEAVE_HANDLERS_LENGTH) {
      next()
      noJudge = false
      if (backFlag) globalHistory--
    } else {
      const nextProxy = countToBack(LEAVE_HANDLERS_LENGTH)
      let allow = true
      for (let i = 0; i < LEAVE_HANDLERS_LENGTH; i++) {
        allow = allow && !!LEAVE_HANDLERS[i].call(this, to, from, nextProxy)
      }

      next(allow)
      if (allow && backFlag) globalHistory--
    }
    backFlag = false
  }
})

function countToBack(num) {
  let count = 0
  return function() {
    count++
    if (count === num) {
      noJudge = true
      router.back()
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

function setGlobalBack(vm) {
  setAppTitleBtn({
    text: '返回',
    position: 'left',
    action: () => {
      vm.$router.back()
    }
  })
}
