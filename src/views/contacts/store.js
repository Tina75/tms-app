import { Address } from './common/model'

export default {
  namespaced: true,
  state: {
    address: new Address()
  },
  mutations: {
    setAddressPage(state, payload) {
      state.address = payload
    }
  },
  actions: {
    resetAddressPage({ commit }, data = new Address()) {
      commit('setAddressPage', data)
    }
  },
  getters: {
    // 防修改
    AddressPage(state) {
      return {
        ...state.address
      }
    }
  }
}
