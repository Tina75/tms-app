export default {
  // 承运商详情
  setCarrierDetail(state, payload = {}) {
    state.contact = payload
  },
  // 合作车辆详情
  setTruckDetail(state, payload = {}) {
    state.truck = payload
  }
}
