class Address {
  data = {
    cityCode: '',
    address: '',
    detail: ''
  }
  dispatch = ''
  namespace = ''
  title = ''
}

export default {
  namespaced: true,
  state: {
    address: new Address()
  },
  mutations: {
    setAddress(state, payload = new Address()) {
      state.address = payload
    }
  },
  actions: {
    modifyAddress({ commit }, data) {
      if (!data) {
        console.warn('[contacts/address]: you will modify nothing!!')
      }
      commit('setAddress', data && { ...data })
    },
    resetAddress({ commit }) {
      commit('setAddress')
    }
  },
  getters: {
    // 防修改
    CommonAddress(state) {
      return {
        ...state.address
      }
    }
  }
}
