import Server from '@/libs/Server'

export default{
  state: {
    receiptList: [],
    fileUrlList: []
  },
  mutations: {
    setReceiptList (state, data) {
      state.receiptList = data
    },
    setFileUrlList (state, data) {
      state.fileUrlList = data
    },
    addFile (state, img) {
      state.fileUrlList.push(img)
    },
    deleteFile (state, index) {
      state.fileUrlList.splice(index, 1)
    }
  },
  actions: {
    getReceiptList ({ state, commit }, waybillId) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'driver/waybill/cargoOrder/list',
          method: 'get',
          params: {
            waybillId
          }
        }).then(res => {
          commit('setReceiptList', res.data.cargoOrderList)
          resolve()
        }).catch(err => console.error(err))
      })
    },
    getReceiptFileUrlList ({ state, commit }, orderId) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'receipt/info',
          method: 'post',
          data: {
            orderId
          }
        }).then(res => {
          commit('setFileUrlList', res.data.fileUrlList)
          resolve()
        }).catch(err => console.error(err))
      })
    },
    getConditionFileUrlList ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'vehicle/info',
          method: 'post',
          data: {
            billId: data.billId,
            billType: data.billType
          }
        }).then(res => {
          commit('setFileUrlList', res.data.fileUrlList)
          resolve()
        }).catch(err => console.error(err))
      })
    },
    addFile ({ state, commit }, img) {
      commit('addFile', img)
    },
    deleteFile ({ state, commit }, index) {
      commit('deleteFile', index)
    },
    uploadReceipt ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'receipt/saveImgInfo',
          method: 'post',
          data: {
            billId: data.billId,
            billType: 2,
            orderId: data.orderId,
            fileUrlList: state.fileUrlList
          }
        }).then(res => {
          resolve()
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    uploadLocation ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'location/upload',
          method: 'post',
          data: data
        }).then(res => {
          resolve()
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    uploadCondition ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'vehicle/saveImgInfo',
          method: 'post',
          data: {
            ...data,
            fileUrlList: state.fileUrlList
          }
        }).then(res => {
          resolve()
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    }
  },
  getters: {
    receiptList: state => state.receiptList,
    fileUrlList: state => state.fileUrlList
  }
}
