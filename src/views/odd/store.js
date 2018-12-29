import Server from '@/libs/Server'

export default{
  state: {
    oddList: []
  },
  mutations: {
    setOddList (state, list) {
      // state.oddList = [...list].concat(state.oddList)
      state.oddList = [...list]
    },
    clearOddList (state) {
      state.oddList = []
    }
  },
  actions: {
    getOddList: ({ commit }, params) => {
      Server({
        url: '/exception/query',
        data: params,
        method: 'post',
        loading: false
      }).then(({ data }) => {
        commit('setOddList', data.exceptionList)
      })
    },
    clearOddList: ({ commit }) => {
      commit('clearOddList')
    },
    uploadOdd: ({ commit }, params) => {
      return Server({
        url: '/exception/upload',
        method: 'post',
        loading: true,
        data: params
      }).then(({ data }) => {
        return data
      })
    }
  },
  getters: {
    OddList: state => state.oddList
  }
}
