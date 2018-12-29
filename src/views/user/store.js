import Server from '@/libs/Server'

export default{
  state: {
    userInfo: {},
    editTypeMap: {
      1: 'avatarUrl',
      2: 'name',
      3: 'phone'
    }
  },
  mutations: {
    getUserInfo (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'uc/queryUserInfo',
          method: 'get'
        }).then(res => {
          commit('getUserInfo', res.data)
          resolve(res.data)
        }).catch(err => console.error(err))
      })
    },
    editUserInfo ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        Server({
          url: 'uc/updateUserInfo',
          method: 'post',
          data: {
            editType: data.type,
            newValueName: data.value,
            oldValueName: state.userInfo[state.editTypeMap[data.type]],
            captcha: data.captcha || null
          }
        }).then(res => {
          resolve()
        }).catch(err => console.error(err))
      })
    },
    queryCaptcha ({ state, commit }, phone) {
      console.log(phone)
      return new Promise((resolve, reject) => {
        Server({
          url: 'uc/editPhoneSms',
          method: 'post',
          data: { phone }
        }).then(res => {
          resolve()
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    submitFeedback ({ state, commit }, data) {
      return Server({
        method: 'post',
        url: 'suggestion/upload',
        data: data
      }).then((res) => {
        // console.log(res.data)
        return res
      }).catch((err) => {
        return err
      })
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
}
