import { loadBMap } from '@/libs/util'

/**
 * 获取两地之间的最短距离，如果存在路线则返回距离（单位：米），不存在则返回空
 * @param {Object<lng, lat>} startPoint 始发地经纬度
 * @param {Object<lng, lat>} endPoint 目的地经纬度
 * @returns {Number} distance 距离（米）
 */
export default (startPoint, endPoint) => {
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
