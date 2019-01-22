import { setAppTitleBtn, clearAppTitleBtn, closeWindow } from '@/libs/bridgeUtil'
import Vue from 'vue'
import router from '@/router'
import PLUGINS from './routerPlugin'

// 运行时的一些判断变量
const RUNTIME = {
  hashChanged: false, // url的Hash值是否有改变,用以判断返回键是否返回到栈顶
  allowLeave: false, // 页面直接离开,不走钩子判断拦截
  countLeaveHandler: 0, // 记录阻拦页面离开时的拦截器数量，当全部通过后才允许页面离开
  leaveAction: { // 寄存离开页面操作的动作,在钩子允许离开后重新执行
    type: '',
    arguments: []
  }
}
// 调用挂载Vue的钩子
PLUGINS.forEach((plugin) => {
  if (plugin.install) {
    plugin.install(Vue)
  }
})
// -----hack back------
router.back = (closeTip) => {
  // 关掉一切提示,直接返回
  if (closeTip) {
    // 表单返回提示
    Vue.prototype.$formWillLeave && Vue.prototype.$formWillLeave()
  }
  // 无api直接得知当前页是否在栈顶,
  // 可以通过试着goback后判断hash是否变化来得知是否到达栈顶
  RUNTIME.hashChanged = false
  router.go(-1)
  setTimeout(() => {
    if (!RUNTIME.hashChanged) {
      console.warn('at top of stack')
      closeWindow({ logOut: false })
    }
  }, 50)
}

// 拦截并记录页面离开的方式
['back', 'push', 'replace', 'go', 'forward'].forEach(name => {
  let pre = router[name]
  router[name] = function () {
    RUNTIME.leaveAction.type = name
    RUNTIME.leaveAction.arguments = Array.from(arguments)
    pre.apply(router, RUNTIME.leaveAction.arguments)
  }
})

router.afterEach((to, from) => {
  // 自动清理上一个页面设置的右侧原生按钮,左侧默认是返回键,需各自自行清理还原
  clearAppTitleBtn()
  // 每次成功进入一个页面后清空离开记录
  RUNTIME.leaveAction.type = ''
})
/// ------全局劫持-----
const ENTER_HANDLERS = getHandlerArr(PLUGINS, 'onEnter')
const ENTER_HANDLERS_LENGTH = ENTER_HANDLERS.length
const LEAVE_HANDLERS = getHandlerArr(PLUGINS, 'onLeave')
const LEAVE_HANDLERS_LENGTH = LEAVE_HANDLERS.length
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
    let go = true
    // hash变化了!
    RUNTIME.hashChanged = true
    if (!RUNTIME.allowLeave && LEAVE_HANDLERS_LENGTH) {
      let allowLeave = countToLeave(to)
      let allows = true
      RUNTIME.countLeaveHandler = 0
      for (let i = 0; i < LEAVE_HANDLERS_LENGTH; i++) {
        // 钩子返回值决定是否要让路由通过, 不需要阻拦的请返回true
        allows = !!LEAVE_HANDLERS[i].call(this, to, from, allowLeave)
        // 若不允许离开则计数+1, 当全部钩子允许通过后再放行back
        if (!allows) {
          RUNTIME.countLeaveHandler++
        }
        go = go && allows
      }
    }
    next(go)
    if (go) {
      RUNTIME.allowLeave = false
    }
  }
})

function countToLeave(to) {
  let count = 0
  let action = RUNTIME.leaveAction
  return function() {
    count++
    if (count === RUNTIME.countLeaveHandler) {
      RUNTIME.allowLeave = true
      if (router[action.type]) {
        router[action.type].apply(router, action.arguments)
      } else {
        router.back()
      }
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
