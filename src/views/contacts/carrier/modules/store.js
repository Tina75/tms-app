import actions from './actions'
import mutations from './mutations'
import { InfinateListFactory } from '@/libs/factory/store'

const state = {

}

const store = {
  namespaced: true,
  mutations,
  actions,
  state,
  getters: {
    contactDetail(state, getters, rootState) {
      const list = state.contactList.list
      const id = +rootState.route.query.carrierId
      if (id) {
        const detail = list.find((item) => item.id === id) || { data: {} }
        return detail.data
      }
      return {}
    }
  }
}
const lists = [
  {
    // 承运商
    key: 'contact',
    url: '/carrier/list',
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
    itemParser(data) {
      return {
        name: data.driverName,
        type: data.carType,
        size: data.carLength,
        phone: data.driverPhone
      }
    }
  }
]
lists.forEach(InfinateListFactory.bind(null, store))
export default store
