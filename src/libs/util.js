// 防抖
export function debounce(func, delay = 300, context) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, arguments), delay)
  }
}

export function reuse(fn, threshhold = 1000, context) {
  let lastTime = Date.now()
  let lastValue
  return function() {
    if (lastValue === undefined) {
      lastValue = fn.apply(context, arguments)
    } else {
      const now = Date.now()
      const remaining = threshhold - (now - lastTime)
      if (remaining <= 0) {
        lastTime = now
        lastValue = fn.apply(context, arguments)
      }
    }
    return lastValue
  }
}

// 节流
export function throttle(fn, threshhold = 160, context) {
  let timeout
  let start = Date.now()
  return function() {
    let current = Date.now()
    clearTimeout(timeout)
    if (current - start >= threshhold) {
      fn.apply(context, arguments)
      start = current
    } else {
      timeout = setTimeout(() => fn.apply(context, arguments), threshhold)
    }
  }
}

// 加载百度地图
let BmapLoaded = false
const BmapUrl = 'https://api.map.baidu.com/api?v=3.0&ak=ggbutTkfutBprx75Y438DhypnH0uGH45'
export function loadBMap() {
  if (!BmapLoaded) {
    BmapLoaded = new Promise((resolve, reject) => {
      window.__BmapCallBack = () => {
        resolve()
      }
      var script = document.createElement('script')
      script.src = BmapUrl + '&callback=__BmapCallBack'
      document.body.appendChild(script)
    })
  }
  return BmapLoaded
}
