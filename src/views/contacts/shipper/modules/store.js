import actions from './actions'
import mutations from './mutations'
import { InfinateListFactory } from '@/libs/factory/store'

const state = {
  operator: [], // 业务员
  // contactDetail: {}, // 发货方详情
  cargoDetail: {}, // 常发货详情
  addressDetail: {} // 地址详情
}

const store = {
  namespaced: true,
  mutations,
  actions,
  state,
  getters: {
    contactDetail(state, getters, rootState) {
      const list = state.contactList.list
      const id = +rootState.route.query.consignerId
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
    // 发货方
    key: 'contact',
    url: '/consigner/page',
    itemParser(data) {
      return {
        id: data.id,
        name: data.name,
        detail: data.contact + '  ' + data.phone,
        phone: data.phone,
        data
      }
    }
  },
  {
    // 发货方地址
    key: 'address',
    useQuery: true,
    url: '/consigner/address/list',
    itemParser(data) {
      return {
        name: data.cityName,
        detail: data.address
      }
    }
  },
  {
    // 常发货物
    key: 'cargo',
    useQuery: true,
    url: '/consigner/cargo/list'
  }
]
lists.forEach((config) => InfinateListFactory(config, store))
export default store
