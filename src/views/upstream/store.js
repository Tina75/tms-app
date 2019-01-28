import * as API from './libs/api'

export default {
  state: {
    // 全部
    statusUpstreamCntObj: {
      total: 0,
      waitAccept: 0,
      rejected: 0,
      accepted: 0
    },
    all: {
      param: {
        pageNo: 1,
        pageSize: 10,
        acceptStatus: ''
      },
      next: true,
      data: []
    },
    waitAccept: {
      param: {
        pageNo: 1,
        pageSize: 10,
        acceptStatus: '0'
      },
      next: true,
      data: []
    },
    accepted: {
      param: {
        pageNo: 1,
        pageSize: 10,
        acceptStatus: '1'
      },
      next: true,
      data: []
    },
    rejected: {
      param: {
        pageNo: 1,
        pageSize: 10,
        acceptStatus: '2'
      },
      next: true,
      data: []
    }
  },
  mutations: {
    GET_STATUS_CNT(state, payload) {
      for (let i in state.statusUpstreamCntObj) {
        state.statusUpstreamCntObj[i] = payload[i]
      }
    },
    LIST_CHANGE(state, payload) {
      state[payload.key].data = payload.data
    },
    PAGE_CHANGE(state, payload) {
      state[payload.key].param.pageNo = payload.pageNo
    },
    NEXT_STATUS(state, payload) {
      state[payload.key].next = payload.status
    }
  },
  actions: {
    getUpstreamStatusCnt: ({ commit }) => {
      API.getStatusCnt()
        .then((response) => {
          commit('GET_STATUS_CNT', response.data.data)
        })
    },
    /**
     * @String payload 键值
     */
    getUpstreamList: ({ commit, state }, payload) => {
      const param = state[payload].param
      API.initList(param)
        .then((response) => {
          const oldData = state[payload].data
          commit('LIST_CHANGE', {
            data: oldData.concat(response.data.data.list),
            key: payload
          })
          commit('NEXT_STATUS', {
            key: payload,
            status: !!response.data.data.hasNext
          })
        })
    },
    /**
     * @Object payload {key: ''}
     */
    initList: ({ dispatch, commit }, payload) => {
      const pageNo = 1
      commit('PAGE_CHANGE', { key: payload.key, pageNo })
      commit('LIST_CHANGE', {
        data: [],
        key: payload.key
      })
      dispatch('getUpstreamList', payload.key)
    },
    reFresh: ({ dispatch }, payload) => {
      dispatch('initList', payload)
    },
    /**
     * @Object payload {key: ''}
     */
    loadMore: ({ dispatch, commit, state }, payload) => {
      const pageNo = ++state[payload.key].param.pageNo
      commit('PAGE_CHANGE', { key: payload.key, pageNo })
      dispatch('getUpstreamList', payload.key)
    }
  },
  getters: {
    statusCnt (state) {
      return state.statusUpstreamCntObj
    },
    UpstreamList (state) {
      return {
        all: state.all.data,
        waitAccept: state.waitAccept.data,
        accepted: state.accepted.data,
        rejected: state.rejected.data
      }
    },
    upstreamNext (state) {
      return {
        all: state.all.next,
        waitAccept: state.waitAccept.next,
        accepted: state.accepted.next,
        rejected: state.rejected.next
      }
    }
  }
}
