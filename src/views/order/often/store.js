import Server from '@/libs/server'

const state = {
  pageNo: 1,
  oftenList: []
}

const getters = {
  pageNo: state => state.pageNo,
  oftenList: state => state.oftenList
}

const mutations = {
  SET_PAGE_NO: (state, payload) => { state.pageNo = payload },
  SET_OFTEN_LIST: (state, payload) => {
    if (state.pageNo === 1) state.oftenList = payload
    else state.oftenList.concat(payload)
  }
}

const actions = {
  getOftenList: async (state, query) => {
    // const list = require('./mock').default
    // state.commit('SET_OFTEN_LIST', list)
    // return true
    const { data } = await Server({
      url: '/ordertemplate/list',
      method: 'post',
      loading: true,
      data: { pageNo: state.pageNo }
    })
    const res = data.data
    state.commit('SET_OFTEN_LIST', res.list)
    if (res.list.length) state.commit('SET_PAGE_NO', state.pageNo + 1)
    return !!res.list.length
  },

  deleteOftenOrder: async (state, id) => {
    Server({
      url: '/ordertemplate/delete',
      method: 'post',
      data: { id }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
