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
export const queryButtOperator = () => {
  return Server({
    method: 'get',
    url: '/permission/buttOperator'
  }).then(response => {
    const data = response.data.data || []
    return data.map(item => ({
      value: item.id,
      text: item.name
    }))
  })
}
