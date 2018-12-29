import Server from '@/libs/Server'
export default{
  state: {
    truckInfo: {}
  },
  mutations: {
    truckInfo (state, payload) {
      state.truckInfo = payload
    }
  },
  actions: {
    // 获取车辆信息
    getTruckInfo: ({ commit, rootState, state, dispatch }) => {
      // console.log(rootState)
      return Server({
        method: 'GET',
        url: 'uc/queryCarInfo',
        data: {
          userId: rootState.userInfo.userId
        }
      }).then((res) => {
        // console.log(res)
        if (res.code === 10000) {
          commit('truckInfo', res.data)
        }
        return res
      }).catch((err) => {
        console.log(err)
        return err
      })
    },
    // 修改车辆信息
    setTruckNo: ({ commit, rootState }, data) => {
      // console.log(rootState)
      return Server({
        method: 'post',
        url: 'uc/updateUserInfo',
        data: Object.assign({}, { userId: rootState.userInfo.userId }, data)
      }).then((res) => {
        return res
      }).catch((err) => {
        return err
      })
    }
  },
  getters: {
    TruckInfo: state => state.truckInfo
  }
}
