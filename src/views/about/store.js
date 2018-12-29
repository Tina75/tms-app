import Server from '@/libs/Server'

export default{
  state: {
    versionText: '已是最新版本'
  },
  mutations: {
    setVersionText (state, data) {
      state.versionText = data
    }
  },
  actions: {
    getLastVersion ({ state, commit }) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'version/checkupdate',
          method: 'get'
        }).then(res => {
          commit('setVersionText', res.data.versionCode)
        }).catch(err => console.error(err))
      })
    }
  },
  getters: {
    versionText: state => state.versionText
  }
}
