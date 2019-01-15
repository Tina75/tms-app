import Server from '@/libs/server'
export default {
  namespaced: true,
  state: {
    msgDetail: {}
  },
  mutations: {
    SET_MSG_DETAIL(state, payload) {
      state.msgDetail = { ...payload }
    }
  },
  actions: {
    getMsgById: ({ commit }, id) => {
      Server({
        url: '/message/detail',
        method: 'post',
        data: { id }
      }).then(({ data }) => {
        commit('SET_MSG_DETAIL', data.data)
      })
    },
    deleteMsgById: ({ commit }, id) => {
      return Server({
        url: '/message/del',
        method: 'post',
        data: { ids: [id] }
      }).then(({ data }) => {
        window.toast('删除成功')
      })
    }
  },
  getters: {
    MsgDetail: state => state.msgDetail
  }
}
