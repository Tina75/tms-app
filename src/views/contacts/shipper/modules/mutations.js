import { ContactDetail } from './model'
export default {
  // ---------发货方------
  // 加载业务员
  setOperatpr(state, payload = []) {
    state.operator = payload
  },
  // 设置发货方详情
  setContactDetailView(state, index) {
    const list = state.contactList.list
    const detail = list[index]
    state.contactDetail = detail ? ContactDetail.parse(detail.data, state.operator) : {}
  }
  // ---------地址------
}
