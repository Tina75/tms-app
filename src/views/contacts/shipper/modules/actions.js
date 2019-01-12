import Server from '@/libs/server'
import * as MODEL from './model'

const actions = {
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
  },
  // ------发货地址---------

}

async function InfinateLoader(names, { state, rootState, commit, dispatch }, needClear) {
  const list = state.contactList
  const needSend = list.hasNext || needClear
  const pageNo = needClear ? 1 : list.nextPage
  if (needSend) {
    const response = await Server({
      method: 'get',
      url: names.loadUrl,
      params: {
        pageNo,
        pageSize: list.pageSize,
        ...rootState.route.query
      }
    })
    if (needClear) {
      commit(names.clearMutation)
    }
    commit(names.addMutation, response.data.data)
  }
}

MODEL.LISTS.forEach((list) => {
  actions[list.loadAction] = InfinateLoader.bind(null, list)
})

export default actions
