import Server from '@/libs/server'
import { InfinateListFactory } from '@/libs/factory/store'

const state = {
  detail: null
}

const getters = {
  detail: state => state.detail
}

const mutations = {
  SET_DETAIL: (state, payload) => { state.detail = payload }
}

const actions = {
  deleteOftenOrder: async (state, id) => {
    Server({
      url: '/ordertemplate/delete',
      method: 'post',
      data: { id }
    })
  },

  getOftenDetail: async ({ commit }, id) => {
    const { data } = await Server({
      url: '/ordertemplate/detail',
      method: 'post',
      data: { id }
    })
    commit('SET_DETAIL', data.data)
  }
}

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

const lists = [
  {
    // 收货方
    key: 'often',
    url: '/ordertemplate/list',
    method: 'post',
    itemParser: data => data
  }
]
lists.forEach(InfinateListFactory.bind(null, store))

export default store
