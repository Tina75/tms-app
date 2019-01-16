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
    url: '/carrier/list?carrierType=2&type=2',
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
      return {
        title: data.carNO,
        tag: data.driverType,
        info: [data.carType, data.carLength],
        name: data.driverName,
        phone: data.driverPhone
      }
    }
  }
]
lists.forEach(InfinateListFactory.bind(null, store))
export default store
