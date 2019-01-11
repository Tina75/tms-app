import Server from '@/libs/server'
export const loadContactList = async ({ state, commit }, needClear) => {
  const list = state.contactList
  const needSend = list.hasNext || needClear
  const pageNo = needClear ? 1 : list.nextPage
  if (needSend) {
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
export const modifyContact = ({ state, commit }) => {
  const isCreate = !state.contactModify.id
  return Server({
    method: 'post',
    url: isCreate ? '/consigner/add' : '/consigner/update',
    data: {
      ...state.contactModify
    }
  })
}
