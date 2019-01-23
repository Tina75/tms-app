import Server from '@/libs/server'
import { InfinateListFactory, DetailFactory } from '@/libs/factory/store'

const store = {
  namespaced: true,
  state: {
    driverDetail: {}
  },
  mutations: {
    setDriverDetail: (state, payload = {}) => { state.driverDetail = payload }
  },
  actions: {
    loadDriverDetail: ({ commit, rootState }) => {
      return Server({
        method: 'get',
        url: '/carrier/details/for/driver',
        loading: true,
        params: { carrierId: rootState.route.query.carrierId }
      }).then((response) => commit('setDriverDetail', response.data.data))
    }
  },
  getters: {}
}
// -----下拉列表-----
const lists = [
  {
    // 司机
    key: 'driver',
    useQuery: true,
    url: '/carrier/list?type=2&carrierType=1&order=update_time,desc',
    itemParser: (data) => ({
      id: data.id,
      name: data.carrierName,
      detail: data.carrierPhone,
      phone: data.carrierPhone,
      data
    })
  }
]
lists.forEach(InfinateListFactory.bind(null, store))

// ----详情----
const details = [
  {
    key: 'driver',
    api: { create: '/carrier/add/for/driver', update: '/carrier/for/driver/update', remove: '/carrier/delete' }
  }
]
details.forEach(DetailFactory.bind(null, store))
export default store
