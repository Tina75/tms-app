import Server from '@/libs/server'
// 发货方列表
export const loadContactList = async ({ state, commit, dispatch }, needClear) => {
  const list = state.contactList
  const needSend = list.hasNext || needClear
  const pageNo = needClear ? 1 : list.nextPage
  if (needSend) {
    if (needClear){
      dispatch('syncButtOperator')
    }
    const response = await Server({
      method: 'get',
      url: '/consigner/page',
      params: {
        pageNo,
        pageSize: list.pageSize
      }
    })
    if (needClear) {
      commit('clearContactList')
    }
    commit('addContactList', response.data.data)
  }
}
// 删除/创建发货方
export const modifyContact = ({ state, commit }, data) => {
  const isCreate = !data.id
  return Server({
    method: 'post',
    url: isCreate ? '/consigner/add' : '/consigner/update',
    data: {
      ...state.contactModify
    }
  })
}
// 同步对接业务员
export const syncButtOperator = ({ state, commit }) => {
  return Server({
    method: 'get',
    url: '/permission/buttOperator'
  }).then(response => commit('setOperatpr', response.data.data))
}
