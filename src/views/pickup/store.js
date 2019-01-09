import Server from '@/libs/Server'
export default{
  state: {
    dispatchingData: {
      list: [
        {
          createTime: '2019-01-08 17:23',
          collectionMoney: 100,
          start: '江苏南京',
          end: '上海',
          weight: 10,
          volume: 10,
          quantity: 10,
          consignerName: '龙虎山道教文化传播有限公司',
          customerOrderNo: '111222333444',
          settlementType: '月结',
          totalFee: 10000
        }
      ],
      next: true
    },
    bePickingData: {
      list: [],
      next: true
    },
    pickingData: {
      list: [],
      next: true
    },
    pickedData: {
      list: [],
      next: true
    }
  },
  mutations: {
    getDispatching (state, data) {
      state.dispatchingData.list.push(...data.list)
      state.dispatchingData.next = data.hasNext
    },
    getBePicking (state, data) {
      state.bePickingData.list.push(...data.list)
      state.bePickingData.next = data.hasNext
    },
    getPicking (state, data) {
      state.pickingData.list.push(...data.list)
      state.pickingData.next = data.hasNext
    },
    getPicked (state, data) {
      state.pickedData.list.push(...data.list)
      state.pickedData.next = data.hasNext
    }
  },
  actions: {
    getDispatching: ({ commit, state }, pageNo) => {
      return Server({
        method: 'post',
        url: 'load/bill/wait/pick/list',
        data: {
          pageSize: 10,
          pageNo,
          status: 10
        }
      }).then((response) => {
        commit('getDispatching', response.data)
      })
    },
    getBePicking: ({ commit, state }, pageNo) => {
      return Server({
        method: 'post',
        url: 'load/bill/list',
        data: {
          pageSize: 10,
          pageNo,
          status: 1
        }
      }).then((response) => {
        commit('getBePicking', response.data)
      })
    },
    getPicking: ({ commit, state }, pageNo) => {
      return Server({
        method: 'post',
        url: 'load/bill/list',
        data: {
          pageSize: 10,
          pageNo,
          status: 2
        }
      }).then((response) => {
        commit('getPicking', response.data)
      })
    },
    getPicked: ({ commit, state }, pageNo) => {
      return Server({
        method: 'post',
        url: 'load/bill/list',
        data: {
          pageSize: 10,
          pageNo,
          status: 3
        }
      }).then((response) => {
        commit('getPicked', response.data)
      })
    }
  },
  getters: {
    dispatchingData: (state) => state.dispatchingData,
    bePickingData: (state) => state.bePickingData,
    pickingData: (state) => state.pickingData,
    pickedData: (state) => state.pickedData
  }
}
