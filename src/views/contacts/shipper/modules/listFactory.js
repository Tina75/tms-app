import Server from '@/libs/server'

class InfinateList {
  list = []
  hasNext = true
  nextPage = 1
  pageSize = 10
}

export default function(config, store) {
  const { key, url, itemParser } = config
  const name = key[0].toUpperCase() + key.slice(1)
  const NAME = {
    addMutation: `add${name}List`,
    clearMutation: `clear${name}List`,
    loadAction: `load${name}List`,
    state: `${key}List`,
    itemModel: `${name}Item`,
    loadUrl: url
  }
  // ------state-----
  store.state[NAME.state] = new InfinateList()

  // ----mutations---
  // 添加
  store.mutations[NAME.addMutation] = (state, payload) => {
    const lazylist = state[NAME.state]
    if (payload.pageNo === lazylist.nextPage) {
      const parsedData = itemParser ? payload.list.map(itemParser) : payload.list
      lazylist.list = [...lazylist.list, ...parsedData]
      lazylist.nextPage = payload.nextPageNo
      lazylist.hasNext = payload.hasNext
    }
  }

  // 清空
  store.mutations[NAME.clearMutation] = (state) => (state[NAME.state] = new InfinateList())

  // ----actions-----
  store.actions[NAME.loadAction] = async ({ state, rootState, commit, dispatch }, needClear) => {
    const list = state.contactList
    const needSend = list.hasNext || needClear
    const pageNo = needClear ? 1 : list.nextPage
    if (needSend) {
      const response = await Server({
        method: 'get',
        url: NAME.loadUrl,
        params: {
          pageNo,
          pageSize: list.pageSize,
          ...rootState.route.query
        }
      })
      if (needClear) {
        commit(NAME.clearMutation)
      }
      commit(NAME.addMutation, response.data.data)
    }
  }
}
