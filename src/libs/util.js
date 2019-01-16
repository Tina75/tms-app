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

/**
 * 获取两地之间的最短距离，如果存在路线则返回距离（单位：米），不存在则返回空
 * @param {Object<lng, lat>} startPoint 始发地经纬度
 * @param {Object<lng, lat>} endPoint 目的地经纬度
 * @returns {Number} distance 距离（米）
 */
export const getDistance = (startPoint, endPoint) => {
  return new Promise(async (resolve, reject) => {
    await loadBMap()
    let distance
    if (!startPoint || !endPoint) reject(new Error('始发地和目的地不能为空'))
    const start = new window.BMap.Point(startPoint.lng, startPoint.lat)
    const end = new window.BMap.Point(endPoint.lng, endPoint.lat)
    const route = new window.BMap.DrivingRoute(start, {
      policy: window.BMAP_DRIVING_POLICY_LEAST_DISTANCE, // 距离最短路线
      onSearchComplete: res => {
        const plan = res.getPlan(0)
        if (plan) { // 如果线路存在则获取距离
          distance = plan.getDistance(false)
        }
        resolve(distance)
      }
    })
    route.search(start, end)
  })
}
