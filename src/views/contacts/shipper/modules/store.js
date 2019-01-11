// import Server from '@/libs/server'
import * as actions from './actions'
import { LazyList, ContactModify, ContactItem } from './model'
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
      const lazy = state.contactList
      if (payload.pageNo === lazy.nextPage) {
        lazy.list = [...lazy.list, ...payload.list.map(ContactItem.parse)]
        lazy.nextPage = payload.nextPageNo
        lazy.hasNext = payload.hasNext
      }
    },
    setContactModify(state, payload) {
    }
  },
  actions,
  getters: {
    ContactList: (state) => state.contactList
  }
}
