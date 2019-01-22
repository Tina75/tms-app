import * as Api from './libs/api'

export default {
  state: {
    receiptStatuNumObj: {
      waiting_sign: 0, // 待签收
      waiting_recovery: 0, // 待回收
      waiting_return_factory: 0, // 待返厂
      already_returned_factory: 0 // 已返厂
    },
    total: {
      param: {
        pageNo: 1,
        pageSize: 10,
        receiptStatus: ''
      },
      next: true,
      data: []
    },
    waiting_sign: {
      param: {
        pageNo: 1,
        pageSize: 10,
        receiptStatus: '-1'
      },
      next: true,
      data: []
    },
    waiting_recovery: {
      param: {
        pageNo: 1,
        pageSize: 10,
        receiptStatus: '0'
      },
      next: true,
      data: []
    },
    waiting_return_factory: {
      param: {
        pageNo: 1,
        pageSize: 10,
        receiptStatus: '1'
      },
      next: true,
      data: []
    },
    already_returned_factory: {
      param: {
        pageNo: 1,
        pageSize: 10,
        receiptStatus: '2'
      },
      next: true,
      data: []
    }
  },
  mutations: {
    GET_STATUS_NUM (state, payload) {
      for (let i in state.receiptStatuNumObj) {
        state.receiptStatuNumObj[i] = payload[i]
      }
    },
    RECEIPT_LIST_CHANGE(state, payload) {
      state[payload.key].data = payload.data
    },
    RECEIPT_PAGE_CHANGE(state, payload) {
      state[payload.key].param.pageNo = payload.pageNo
    },
    RECEIPT_NEXT_STATUS(state, payload) {
      state[payload.key].next = payload.status
    }
  },
  actions: {
    getReceiptStatusCnt ({ commit }) {
      Api.getSatatusNum()
        .then(res => {
          commit('GET_STATUS_NUM', res.data.data)
        })
    },
    /**
     * @String payload 键值
     */
    getReceiptList: ({ commit, state }, payload) => {
      const param = state[payload].param
      Api.initList(param)
        .then((response) => {
          const oldData = state[payload].data
          const list = response.data.data.list || []
          commit('RECEIPT_LIST_CHANGE', {
            data: oldData.concat(list),
            key: payload
          })
          commit('RECEIPT_NEXT_STATUS', {
            key: payload,
            status: !!response.data.data.hasNext
          })
        })
    },
    /**
     * @Object payload {key: ''}
     */
    initReceiptList: ({ dispatch, commit }, payload) => {
      const pageNo = 1
      commit('RECEIPT_PAGE_CHANGE', { key: payload.key, pageNo })
      commit('RECEIPT_LIST_CHANGE', {
        data: [],
        key: payload.key
      })
      dispatch('getReceiptList', payload.key)
    },
    receiptReFresh: ({ dispatch }, payload) => {
      dispatch('initReceiptList', payload)
    },
    /**
     * @Object payload {key: ''}
     */
    receiptLoadMore: ({ dispatch, commit, state }, payload) => {
      const pageNo = ++state[payload.key].param.pageNo
      commit('RECEIPT_PAGE_CHANGE', { key: payload.key, pageNo })
      dispatch('getReceiptList', payload.key)
    }
  },
  getters: {
    receiptStatusCnt: (state) => state.receiptStatuNumObj,
    receiptList (state) {
      return {
        total: state.total.data,
        waiting_sign: state.waiting_sign.data,
        waiting_recovery: state.waiting_recovery.data,
        waiting_return_factory: state.waiting_return_factory.data,
        already_returned_factory: state.already_returned_factory.data
      }
    },
    receiptNext (state) {
      return {
        total: state.total.next,
        waiting_sign: state.waiting_sign.next,
        waiting_recovery: state.waiting_recovery.next,
        waiting_return_factory: state.waiting_return_factory.next,
        already_returned_factory: state.already_returned_factory.next
      }
    }
  }
}
