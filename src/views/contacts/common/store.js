class Address {
  cityCode = ''
  address = ''
  detail = ''
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
      commit('setAddress', data)
    },
    resetAddress({ commit }) {
      commit('setAddress')
    }
  },
  getters: {}
}
