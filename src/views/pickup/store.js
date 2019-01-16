import server from '@/libs/server'
export default {
  state: {
    namespaced: true,
    dispatchingData: {
      list: [],
      next: true,
      pageNo: 1
    },
    bePickingData: {
      list: [],
      next: true,
      pageNo: 1
    },
    pickingData: {
      list: [],
      next: true,
      pageNo: 1
    },
    pickedData: {
      list: [],
      next: true,
      pageNo: 1
    },
    tabCount: {
      DispatchingList: 0,
      BePickingList: 0,
      PickingList: 0,
      PickedList: 0
    },
    pickupDetail: {},
    settlementTypeMap: {
      1: '现付',
      2: '到付',
      3: '回付',
      4: '月结'
    }
  },
  mutations: {
    getPickupCount (state, data) {
      state.tabCount = {
        DispatchingList: data.waitDispatchCnt,
        BePickingList: data.waitCnt,
        PickingList: data.loadCnt,
        PickedList: data.loadedCnt
      }
    },
    getDispatching (state, data) {
      state.dispatchingData.list.push(...data.list)
      state.dispatchingData.pageNo = data.pageNo
      state.dispatchingData.next = data.hasNext
    },
    getBePicking (state, data) {
      state.bePickingData.list.push(...data.loadbillList)
      state.bePickingData.pageNo = data.pageNo
      state.bePickingData.next = data.hasNext
    },
    getPicking (state, data) {
      state.pickingData.list.push(...data.loadbillList)
      state.pickingData.pageNo = data.pageNo
      state.pickingData.next = data.hasNext
    },
    getPicked (state, data) {
      state.pickedData.list.push(...data.loadbillList)
      state.pickedData.pageNo = data.pageNo
      state.pickedData.next = data.hasNext
    }
  },
  actions: {
    getPickupCount ({ commit, state }) {
      return new Promise((resolve, reject) => {
        server({
          method: 'GET',
          url: 'load/bill/tab/cnt'
        }).then((response) => {
          commit('getPickupCount', response.data.data)
          resolve()
        })
      })
    },
    setPageStart ({ commit, state }, list) {
      return new Promise((resolve, reject) => {
        state[list] = {
          list: [],
          next: true,
          pageNo: 1
        }
        resolve()
      })
    },
    getDispatching: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/wait/pick/list',
          data: {
            pageSize: 10,
            pageNo: state.dispatchingData.pageNo + 1,
            status: 10
          }
        }).then((response) => {
          commit('getDispatching', response.data.data)
          resolve()
        })
      })
    },
    getBePicking: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/list',
          data: {
            pageSize: 10,
            pageNo: state.bePickingData.pageNo + 1,
            status: 1
          }
        }).then((response) => {
          commit('getBePicking', response.data.data)
          resolve()
        })
      })
    },
    getPicking: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        return server({
          method: 'post',
          url: 'load/bill/list',
          data: {
            pageSize: 10,
            pageNo: state.pickingData.pageNo + 1,
            status: 2
          }
        }).then((response) => {
          commit('getPicking', response.data.data)
          resolve()
        })
      })
    },
    getPicked: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/list',
          data: {
            pageSize: 10,
            pageNo: state.pickedData.pageNo + 1,
            status: 3
          }
        }).then((response) => {
          commit('getPicked', response.data.data)
          resolve()
        })
      })
    }
  },
  getters: {
    tabCount: (state) => state.tabCount,
    settlementTypeMap: (state) => state.settlementTypeMap,
    dispatchingData: (state) => state.dispatchingData,
    bePickingData: (state) => state.bePickingData,
    pickingData: (state) => state.pickingData,
    pickedData: (state) => state.pickedData,
    pickupDetail: (state) => state.pickupDetail
  }
}
