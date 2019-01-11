import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import mock from '../pages/mock..json'

const state = {
  driverList: mock.list // 司机列表
}
const mutations = {
  [types.GET_DRIVER_LIST] (state, payload = []) {
    state.driverList = payload
  }
}

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
}
