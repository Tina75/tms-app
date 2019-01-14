import { InfinateListFactory, DetailFactory } from '@/libs/factory/store'

const store = {
  namespaced: true,
  state: {
    saveConsigner: {}, // 存储所属发货方
    consigneeDetail: {}
  },
  mutations: {
    saveConsigner: (state, payload = {}) => { state.saveConsigner = payload },
    consigneeDetail: (state, payload = {}) => { state.consigneeDetail = payload }
  },
  actions: {
    saveConsignerInfo: ({ state, commit }, data = {}) => {
      commit('saveConsigner', data)
    },
    loadConsigneeDetail: ({state, commit, rootState }) => {
      const list = state.consigneeList.list
      const id = +rootState.route.query.consigneeId
      if (id) {
        const detail = list.find((item) => item.id === id) || { data: {} }
        commit('consigneeDetail', detail.data )
      }
      commit('consigneeDetail',{} )
    }
  },
  getters: {
    consigneeDetail: (state) => state.consigneeDetail
  }
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
