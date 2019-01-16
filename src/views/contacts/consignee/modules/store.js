import Server from '@/libs/server'
import cityUtil from '@/libs/city'
import { ConsigneeDetail } from './model'
import { InfinateListFactory, DetailFactory } from '@/libs/factory/store'

const store = {
  namespaced: true,
  state: {
    saveConsigner: {}, // 存储所属发货方
    consigneeDetail: {},
    formList: {
      id: '',
      address: '',
      cityCode: '',
      cityName: '',
      consigneeCompanyName: '',
      consignerId: '',
      consignerName: '',
      contact: '',
      latitude: '',
      longitude: '',
      mapType: 1,
      phone: '',
      remark: ''
    }
  },
  mutations: {
    saveConsigner: (state, payload = {}) => { state.saveConsigner = payload },
    setConsigneeDetail: (state, payload = {}) => { state.consigneeDetail = payload },
    formList: (state, payload) => { state.formList = payload }
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
    },
    clearForm: ({ commit }) => {
      const data = new ConsigneeDetail()
      commit('formList', data)
    },
    addressAction: ({ state, dispatch }, addressData) => {
      console.info('addressAction', addressData)
      // const cityName = cityUtil.getCityNameArray(addressData.locale).join('')
      return dispatch('modifyAddress', {
        address: addressData.address + addressData.additional,
        longitude: addressData.lon,
        latitude: addressData.lat,
        cityCode: addressData.code,
        mapType: 1
      })
      // console.info(data)
    }
  },
  getters: {
    formList: (state) => state.formList
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
