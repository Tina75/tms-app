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
    }
  },
  getters: {
    companyInfo: (state) => {
      return state.companyInfo
    }
  }
}
