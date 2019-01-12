import * as MODEL from './model'
const mutations = {
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

MODEL.LISTS.forEach((names) => {
  // 添加
  mutations[names.addMutation] = (state, payload) => {
    const lazylist = state[names.state]
    const parser = MODEL[names.itemModel] ? MODEL[names.itemModel].parse : ''
    if (payload.pageNo === lazylist.nextPage) {
      const parsedData = parser ? payload.list.map(parser) : payload.list
      lazylist.list = [...lazylist.list, ...parsedData]
      lazylist.nextPage = payload.nextPageNo
      lazylist.hasNext = payload.hasNext
    }
  }

  // 清空
  mutations[names.clearMutation] = (state) => (state[names.state] = new MODEL.InfinateList())
})
export default mutations
