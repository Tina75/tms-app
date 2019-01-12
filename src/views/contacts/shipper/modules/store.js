import actions from './actions'
import mutations from './mutations'
import listfactory from './listFactory'
import { ContactItem } from './model'

const state = {
  operator: [], // 业务员
  contactDetail: {} // 发货方详情
}

const store = {
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
const lists = [
  {
    // 发货方
    key: 'contact',
    url: '/consigner/page',
    itemParser: ContactItem.parse
  },
  {
    // 发货方地址
    key: 'address',
    url: '/consigner/address/list'
  },
  {
    // 常发货物
    key: 'cargo',
    url: '/consigner/cargo/list'
  }
]
lists.forEach((config) => listfactory(config, store))
export default store
