import Server from '@/libs/server'

class InfinateList {
  list = []
  hasNext = true
  nextPage = 1
  pageSize = 10
}
/**
 * config:{
 *  key: 指定键名,
 *  url: action加载的链接,
 *  method?: 请求方式
 *  useQuery?: 将route的query加入请求中
 *  useParam?: 将route的param加入请求
 *  itemParser?: 有则遍历List转化后再存入state
 * }
 * 后端返回格式为如下格式时规范化无限列表的store生成工厂
 * pageNo
 * nextPageNo
 * hasNext
 * list
 * @param {*} config
 * @param {*} store
 */

export function InfinateListFactory({ key, url, itemParser, useQuery, useParam, method = 'get' } = {}, store = {}) {
  method = method.toLowerCase()
  const name = key[0].toUpperCase() + key.slice(1)
  const NAME = {
    addMutation: `add${name}List`,
    clearMutation: `clear${name}List`,
    loadAction: `load${name}List`,
    state: `${key}List`,
    itemModel: `${name}Item`
  }
  // ------state-----
  store.state[NAME.state] = new InfinateList()

  // ----mutations---
  // 添加，校验当前返回的pageNo是否是需要的nextPage索引
  store.mutations[NAME.addMutation] = (state, payload) => {
    const lazylist = state[NAME.state]
    if (payload.pageNo === lazylist.nextPage) {
      const parsedData = itemParser ? payload.list.map(itemParser) : payload.list
      lazylist.list = [...lazylist.list, ...parsedData]
      lazylist.nextPage = payload.nextPageNo
      lazylist.hasNext = !!payload.hasNext
    }
  }

  // 清空
  store.mutations[NAME.clearMutation] = (state) => (state[NAME.state] = new InfinateList())

  // ----actions-----
  // 根据clear入参决定是否是刷新操作, 在请求完后再更新数据
  // 请求成功后再删除数据进行更新，保障若失败也能保留请求前的显示
  // 取
  store.actions[NAME.loadAction] = async ({ state, rootState, commit, dispatch }, needClear) => {
    const list = state.contactList
    const needSend = list.hasNext || needClear
    const pageNo = needClear ? 1 : list.nextPage
    if (needSend) {
      let data = {
        pageNo,
        pageSize: list.pageSize,
        ...(useParam ? rootState.route.params : {}),
        ...(useQuery ? rootState.route.query : {})
      }
      const response = await Server({
        method,
        url,
        [method === 'get' ? 'params' : 'data']: data
      })
      if (needClear) {
        commit(NAME.clearMutation)
      }
      commit(NAME.addMutation, response.data.data)
    }
  }
}
