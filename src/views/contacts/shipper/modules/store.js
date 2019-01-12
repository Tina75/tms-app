import actions from './actions'
import mutations from './mutations'
import * as MODEL from './model'

const state = {
  operator: [], // 业务员
  contactDetail: {}, // 发货方详情
  addressList: new MODEL.InfinateList()
}

MODEL.LISTS.forEach(names =>{
  state[names.state] = new MODEL.InfinateList()
})
export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters: {
    ContactOperatorOptions: (state) =>
      state.operator.map((item) => ({
        value: item.id,
        text: item.name
      }))
  }
}
