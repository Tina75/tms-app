import Server from '@/libs/server'
export default {
  state: {
    dispatch: {
      list: [],
      pageNo: 1,
      total: 1
    }
  },
  mutations: {
    DISPATCH (state, payload) {
      state.dispatch.pageNo = payload.pageNo
      state.dispatch.list = state.dispatch.list.concat(payload.list)
      state.dispatch.total = payload.total
    },
    NEWS_CLEAR (state) {
      state.news = { list: [], startPage: 1, totalPages: 1 }
    }
  },
  actions: {
    getDispatch: ({ commit, state }, payload) => {
      return Server({
        url: '/load/bill/wait/pick/list',
        method: 'post',
        data: {
          status: 20
        }
      }).then(({ data }) => {
        commit('DISPATCH', data.data)
      })
    }
  },
  getters: {
    DispatchList: (state) => state.dispatch.list
  }
}
