import Server from '@/libs/server'

export default {
  namespaced: true,
  state: {
    detail: {}
  },
  mutations: {
    DETAIL: (state, info) => {
      state.detail = { ...info }
    },
    CLEAR_DETAIL: (state) => {
      state.detail = {}
    }
  },
  getters: {
    Detail: state => state.detail,
    CargoList: state => state.detail.orderCargoList
  },
  actions: {
    getDetail: ({ commit, state }, id) => {
      Server(`/order/detail?id=${id}`).then(({ data }) => {
        commit('DETAIL', data.data)
      })
    },
    clearDetail: ({ commit }) => {
      commit('CLEAR_DETAIL')
    }
  }
}
