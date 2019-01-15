import Server from '@/libs/server'
import { InfinateListFactory, DetailFactory } from '@/libs/factory/store'

const store = {
  namespaced: true,
  state: {
    saveConsigner: {}, // 存储所属发货方
    consigneeDetail: {}
  },
  mutations: {
    saveConsigner: (state, payload = {}) => { state.saveConsigner = payload },
    setConsigneeDetail: (state, payload = {}) => { state.consigneeDetail = payload }
  },
  actions: {
    saveConsignerInfo: ({ state, commit }, data = {}) => {
      commit('saveConsigner', data)
    },
    loadConsigneeDetail: ({ commit, rootState }) => {
      Server({
        method: 'get',
        url: '/consigner/consignee/detail',
        loading: true,
        params: { id: rootState.route.query.consigneeId }
      }).then((response) => commit('setConsigneeDetail', response.data.data))
    }
  },
  getters: {}
}
// -----下拉列表-----
const lists = [
  {
    // 收货方
    key: 'consignee',
    url: '/consigner/consignee/list',
    itemParser: (data) => ({
      id: data.id,

      name: data.contact + '  ' + data.phone,
      detail: data.cityName ? data.cityName + data.address : data.address,
      phone: data.phone,
      data
    })
  },
  {
    // 发货方
    key: 'sender',
    url: '/consigner/page',
    itemParser: (data) => ({
      id: data.id,
      name: data.name,
      detail: data.contact + '  ' + data.phone,
      phone: data.phone,
      data
    })
  }
]
lists.forEach(InfinateListFactory.bind(null, store))

// ----详情----
const details = [
  {
    key: 'consignee',
    api: { create: '/consigner/consignee/add', update: '/consigner/consignee/update', remove: '/consigner/consignee/delete' }
  }
]
details.forEach(DetailFactory.bind(null, store))
export default store
