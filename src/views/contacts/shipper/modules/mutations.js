export default {
  // ---------发货方------
  // 加载业务员
  setOperatpr(state, payload = []) {
    state.operator = payload
  },
  // 设置发货方详情
  setContactDetail(state, index) {
    const list = state.contactList.list
    const detail = list[index]
    if (detail) {
      state.contactDetail = detail.data
    }
  }
  // ---------地址------
}
