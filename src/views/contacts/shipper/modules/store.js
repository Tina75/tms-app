// import Server from '@/libs/server'
import * as actions from './actions'
import { LazyList, ContactItem } from './model'
export default {
  namespaced: true,
  state: {
    operator: [], // 业务员
    contactList: new LazyList(), // 发货方列表
    contactDetail: {} // 发货方详情
  },
  mutations: {
    setOperatpr(state, payload = []) {
      state.operator = payload
    },
    clearContactList(state) {
      state.contactList = new LazyList()
    },
    addContactList(state, payload) {
      const lazy = state.contactList
      if (payload.pageNo === lazy.nextPage) {
        lazy.list = [...lazy.list, ...payload.list.map(ContactItem.parse)]
        lazy.nextPage = payload.nextPageNo
        lazy.hasNext = payload.hasNext
      }
    },
    setContactDetail(state, index) {
      const list = state.contactList.list
      const detail = list[index]
      if (detail) {
        state.contactDetail = detail.data
      }
    }
  },
  actions,
  getters: {
    ContactOperatorName: (state) => {
      const detail = state.contactDetail
      const operator = state.operator
      if (detail.salesmanId) {
        const salesman = operator.find((item) => item.id === detail.salesmanId)
        return salesman ? salesman.name : ''
      }
      return ''
    },
    ContactOperatorSelection: (state) =>
      state.operator.map((item) => ({
        value: item.id,
        text: item.name
      }))
  }
}
