import Server from '@/libs/server'
export default {
  state: {
    companyInfo: {}
  },
  mutations: {
    setCompanyInfo (state, info) {
      state.companyInfo = { ...info }
    }
  },
  actions: {
    getCompanyInfo: ({ state, commit, rootState }, params) => {
      return Server('set/companyInfo').then(({ data }) => {
        commit('setCompanyInfo', data.data)
      })
    },
    saveCompanyInfo: ({ state, commit, rootState }, params) => {
      return Server({
        url: 'set/company',
        method: 'post',
        data: params
      })
    },
    shareCompanyInfo: ({ data }) => {
      return Server({
        url: '/set/sharecompany',
        method: 'post'
      }).then(({ data }) => {
        return data.data.shareOutNo
      })
    }
  },
  getters: {
    companyInfo: (state) => {
      return state.companyInfo
    }
  }
}
