export default {
  // ---------发货方------
  // 加载业务员
  setOperatpr(state, payload = []) {
    state.operator = payload
  },
  // 设置发货方详情
  setContactDetail(state, index = -1) {
    if (index !== -1) {
      const list = state.contactList.list
      const detail = list[index]
      state.contactDetail = detail ? detail.data : {}
    } else {
      state.contactDetail = {}
    }
  }
  // ---------地址------
}
