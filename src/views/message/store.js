import Server from '@/libs/Server'
const IMAGE_PREFIX = process.env.VUE_APP_IMG_HOST
export default {
  state: {
    messageList: [],
    messageDetail: []
  },
  mutations: {
    setList (state, payload) {
      state.messageList = payload.list.map((v) => ({
        ...v,
        iconUrl: IMAGE_PREFIX + v.iconUrl + '?x-oss-process=image/resize,m_fill,w_60,h_60'
      }))
    },
    setDetail (state, payload) {
      state.messageDetail = payload.list
    }
  },
  actions: {
    getMessage: ({ commit }) => {
      return Server({
        method: 'get',
        url: 'message/typeInfo',
        loading: true
      }).then((res) => {
        // console.log(res)
        commit('setList', res.data)
      })
    },
    getDetail: ({ commit }, type) => {
      return Server({
        method: 'post',
        url: 'message/list',
        data: {
          type: type,
          pageSize: 100
        },
        loading: true
      })
        .then((res) => {
          commit('setDetail', res.data)
          return res
        })
        .catch((err) => {
          return err
        })
    },
    deleteMessage: ({ commit }, id) => {
      return Server({
        method: 'post',
        url: 'message/del',
        data: {
          id: id
        }
      })
        .then((res) => {
          return res
        })
        .catch((err) => {
          return err
        })
    }
  },
  getters: {
    MessageList: (state) => state.messageList,
    MessageDetail: (state) => state.messageDetail
  }
}
