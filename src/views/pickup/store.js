import server from '@/libs/server'
export default {
  namespaced: true,
  state: {
    namespaced: true,
    dispatchingData: {
      list: [],
      next: true,
      pageNo: 0
    },
    bePickingData: {
      list: [],
      next: true,
      pageNo: 0
    },
    pickingData: {
      list: [],
      next: true,
      pageNo: 0
    },
    pickedData: {
      list: [],
      next: true,
      pageNo: 0
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
    },
    carTypeMap: {
      1: '平板',
      2: '高栏',
      3: '厢车',
      4: '自卸',
      5: '冷藏',
      6: '保温',
      7: '高低板',
      8: '面包车',
      9: '爬梯车',
      10: '飞翼车',
      11: '罐车'
    },
    carLengthMap: {
      1: '1.8米',
      2: '2.7米',
      3: '3.8米',
      4: '4.2米',
      5: '5米',
      6: '6.2米',
      7: '6.8米',
      8: '7.7米',
      9: '8.2米',
      10: '8.7米',
      11: '9.6米',
      12: '11.7米',
      13: '12.5米',
      14: '13米',
      15: '15米',
      16: '16米',
      17: '17.5米'
    },
    backupDriverList: []
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
    },
    getBackupDriverList (state, data) {
      state.backupDriverList = data
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
    },
    createPickup: ({ commit, state }, ids) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/create',
          data: {
            orderIds: ids
          }
        }).then(() => {
          resolve()
        })
      })
    },
    removeOrder: ({ state }, index) => {
      return new Promise((resolve, reject) => {
        state.dispatchingData.list.splice(index, 1)
        resolve()
      })
    },
    getPickupDetailForAssign: ({ state, commit }, id) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/details',
          data: {
            pickUpId: id
          }
        }).then((response) => {
          resolve(response.data.data.loadbill)
        })
      })
    },
    getCarrierNameList: ({ state, commit }) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'get',
          url: 'carrier/list',
          params: {
            type: 1,
            keyword: '',
            pageNo: 1,
            pageSize: 100,
            carrierType: 2
          }
        }).then((response) => {
          resolve(response.data.data.list.map(item => item.carrierName))
        })
      })
    },
    getSelfCarList: ({ state, commit }) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'get',
          url: 'ownerCar/findCarList'
        }).then((response) => {
          resolve(response.data.data.map(item => {
            return { value: `${item.carNo}-${item.carType}-${item.carLength}`, text: `${item.carNo}-${state.carTypeMap[item.carType]}-${state.carLengthMap[item.carLength]}` }
          }))
        })
      })
    },
    getSelfDriverList: ({ state, commit }) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'get',
          url: 'ownerCar/listDriverList'
        }).then((response) => {
          commit('getBackupDriverList', response.data.data.map(item => `${item.driverName}-${item.driverPhone}`))
          resolve(response.data.data.map(item => `${item.driverName}-${item.driverPhone}`))
        })
      })
    },
    assign: ({ state, commit, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/pick/up',
          data
        }).then(() => {
          resolve()
        })
      })
    },
    reloadCurrentPickup: ({ state, commit, dispatch }, id) => {
      return new Promise((resolve, reject) => {
        server({
          method: 'post',
          url: 'load/bill/details',
          data: {
            pickUpId: id
          }
        }).then((response) => {
          let index = state.bePickingData.list.findIndex(item => item.pickupId === id)
          if (index >= 0) {
            state.bePickingData.list.splice(index, 1, response.data.data.loadbill)
          }
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
    chosenList: (state) => state.chosenList,
    chosenStat: (state) => state.chosenStat,
    pickupDetail: (state) => state.pickupDetail,
    backupDriverList: (state) => state.backupDriverList
  }
}
