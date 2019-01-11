// import Server from '@/libs/server'
import contactMock from './mock/contact.json'
import { Server } from 'https'
class LazyList {
  list = []
  state = 0
  currentPage = 0
  totalCount = 0
  pageSize = 10
}
class ContactModify {
  id = ''
  name = '' //
  contact = '' // 发货方联系人
  phone = ''
  payType = '' // 支付方式 1：现付 2：到付 3：回单付 4：月结
  remark = '' // 备注
  isInvoice = '' // 是否开票
  salesmanId = '' // 对接业务员
  invoiceRate = ''
  exploiteChannel = '' // 开括渠道
}
export default {
  namespaced: true,
  state: {
    contactList: new LazyList(),
    contactModify: new ContactModify()
  },
  mutations: {
    clearContactList(state) {
      state.contactList = new LazyList()
    },
    addContactList(state, payload) {
      const list = state.contactList.list
      state.contactList.list = list.concat(contactMock)
    },
    setContactModify(state, payload) {
      state.contactModify[payload.key] = payload.value
    }
  },
  actions: {
    loadContactList({ state, commit }) {
      // const list = state.contactList
      // return Server({
      //   method: 'get',
      //   url: '/consigner/page',
      //   params: {
      //     pageNo: list.currentPage + 1,
      //     pageSize: list.pageSize
      //   }
      // })
      return new Promise((resolve) => {
        setTimeout(() => commit('addContactList'), 3000)
      })
    },
    modifyContact({ state, commit }) {
      const isCreate = !state.contactModify.id
      return Server({
        method: 'post',
        url: isCreate ? '/consigner/add' : '/consigner/update',
        data: {
          ...state.contactModify
        }
      })
    }
  },
  getters: {
    ContactList: (state) => state.contactList.list
  }
}
