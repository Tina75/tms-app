import actions from './actions'
import mutations from './mutations'
import { InfinateListFactory } from '@/libs/factory/store'
import { TruckDetail } from '../modules/model'

const state = {
  contact: {},
  truck: {}
}

const store = {
  namespaced: true,
  mutations,
  actions,
  state,
  getters: {
    contactDetail(state, getters, rootState) {
      return state.contact
    },
    truckDetail(state, getters, rootState) {
      return state.truck
    }
  }
}
const lists = [
  {
    // 承运商
    key: 'contact',
    url: '/carrier/list?carrierType=2&type=2&order=update_time,desc',
    itemParser(data) {
      return {
        id: data.id,
        name: data.carrierName,
        detail: data.carrierPrincipal + '  ' + data.carrierPhone,
        phone: data.carrierPhone,
        data
      }
    }
  },
  {
    // 合作车辆
    key: 'truck',
    useQuery: true,
    url: '/carrier/list/car',
    method: 'post',
    itemParser(data) {
      data = TruckDetail.toViewItem(data)
      let res = {
        id: data.id,
        carrierId: data.carrierId,
        title: data.carNO,
        tag: data.driverType,
        info: [],
        detail: data.driverName + '  ' + data.driverPhone,
        phone: data.driverPhone
      }
      data.carType && res.info.push(data.carType)
      data.carLength && res.info.push(data.carLength)
      return res
    }
  }
]
lists.forEach(InfinateListFactory.bind(null, store))
export default store
