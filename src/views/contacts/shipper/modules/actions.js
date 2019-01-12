import Server from '@/libs/server'
export default {
  // -------发货方-----
  // 删除/创建发货方
  modifyContact({ state, commit }, data) {
    const isCreate = !data.id
    return Server({
      method: 'post',
      url: isCreate ? '/consigner/add' : '/consigner/update',
      data: {
        ...state.contactModify
      }
    })
  },
  // 同步对接业务员
  syncButtOperator({ state, commit }) {
    return Server({
      method: 'get',
      url: '/permission/buttOperator'
    }).then((response) => commit('setOperatpr', response.data.data))
  }
  // ------发货地址---------
}
