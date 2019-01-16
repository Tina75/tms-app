import Server from '@/libs/server'
import cityUtil from '@/libs/city'
import { InfinateListFactory, DetailFactory } from '@/libs/factory/store'

const store = {
  namespaced: true,
  state: {
    operator: [], // 业务员
    contactDetail: {} // 发货人详情
  },
  mutations: {
    setOperator: (state, payload = []) => (state.operator = payload),
    setContactDetail: (state, payload) => (state.contactDetail = payload)
  },
  actions: {
    // 交给common/address页面处理的action
    addressAction: ({ state, dispatch }, addressData) =>
      dispatch('modifyAddress', {
        id: addressData.id,
        consignerId: addressData.consignerId,
        address: addressData.address,
        longitude: addressData.lon,
        latitude: addressData.lat,
        cityName: cityUtil.getCityNameArray(addressData.locale).join(''),
        cityCode: addressData.code,
        consignerHourseNumber: addressData.additional,
        mapType: 1
      }),
    // 同步业务员
    syncButtOperator: ({ state, commit }) =>
      Server({ method: 'get', url: '/permission/buttOperator' }).then((response) =>
        commit('setOperator', response.data.data)
      ),
    loadContactDetail: ({ rootState, commit }) =>
      Server({
        method: 'get',
        url: '/consigner/detail',
        loading: true,
        params: { id: rootState.route.query.consignerId }
      }).then((response) => commit('setContactDetail', response.data.data))
  },
  getters: {}
}

// -----下拉列表-----
const lists = [
  {
    // 发货方
    key: 'contact',
    url: '/consigner/page',
    itemParser: (data) => ({
      id: data.id,
      name: data.name,
      detail: data.contact + '  ' + data.phone,
      phone: data.phone,
      data
    })
  },
  {
    // 发货方地址
    key: 'address',
    useQuery: true,
    url: '/consigner/address/list',
    itemParser: (data) => ({
      id: data.id,
      name: data.cityName,
      detail: data.address + data.consignerHourseNumber,
      data
    })
  },
  {
    // 常发货物
    key: 'cargo',
    useQuery: true,
    itemParser: (data) => ({
      id: data.id,
      data
    }),
    url: '/consigner/cargo/list'
  }
]
lists.forEach(InfinateListFactory.bind(null, store))

// ----详情----
const details = [
  {
    key: 'contact',
    api: { create: '/consigner/add', update: '/consigner/update', remove: '/consigner/delete' }
  },
  {
    key: 'address',
    api: { create: '/consigner/address/add', update: '/consigner/address/update', remove: '/consigner/address/delete' }
  },
  {
    key: 'cargo',
    api: { create: '/consigner/cargo/add', update: '/consigner/cargo/update', remove: '/consigner/cargo/delete' }
  }
]
details.forEach(DetailFactory.bind(null, store))
export default store
