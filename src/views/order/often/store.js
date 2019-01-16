import Server from '@/libs/server'
import { InfinateListFactory } from '@/libs/factory/store'

const state = {}

const getters = {}

const mutations = {}

const actions = {
  // getOftenList: async (state, query) => {
  //   const { data } = await Server({
  //     url: '/ordertemplate/list',
  //     method: 'post',
  //     loading: true,
  //     data: { pageNo: state.pageNo }
  //   })
  //   const res = data.data
  //   state.commit('SET_OFTEN_LIST', res.list)
  //   if (res.list.length) state.commit('SET_PAGE_NO', state.pageNo + 1)
  //   return !!res.list.length
  // },

  deleteOftenOrder: async (state, id) => {
    Server({
      url: '/ordertemplate/delete',
      method: 'post',
      data: { id }
    })
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
