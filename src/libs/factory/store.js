import Server from '@/libs/server'
class Store {
  actions = {}
  state = {}
  mutations = {}
}
class InfinateList {
  list = []
  hasNext = true
  nextPage = 1
  pageSize = 10
}
/**
 * 参考: contacts/shipper/pages/index
 * config:{
 *  key: 指定键名,
 *  url: action加载的链接,
 *  method?: 请求方式
 *  useQuery?: 将route的query加入请求中
 *  useParam?: 将route的param加入请求
 *  itemParser?: 有则遍历List转化后再存入state
 *  nameMap?: 键别名设置
 * }
 * 后端返回格式为如下格式时规范化无限列表的store生成工厂
 * pageNo
 * nextPageNo
 * hasNext
 * list
 * @param {*} config
 * @param {*} store
 */

export function InfinateListFactory(
  store = new Store(),
  { key, url, itemParser, useQuery, useParam, method = 'get', nameMap = { data: 'list' } } = {}
) {
  method = method.toLowerCase()
  const name = key[0].toUpperCase() + key.slice(1)
  const NAME = {
    state: `${key}List`,
    addMutation: `add${name}List`,
    clearMutation: `clear${name}List`,
    loadAction: `load${name}List`,
    itemModel: `${name}Item`
  }
  // ------state-----
  safeSet(store.state, NAME.state, new InfinateList())

  // ----mutations---
  // 添加，校验当前返回的pageNo是否是需要的nextPage索引
  safeSet(store.mutations, NAME.addMutation, (state, payload) => {
    const lazylist = state[NAME.state]
    if (payload.pageNo === lazylist.nextPage) {
      const data = payload[nameMap.data]
      if (data) {
        const parsedData = itemParser ? data.map(itemParser) : data
        lazylist.list = [...lazylist.list, ...parsedData]
        lazylist.nextPage = payload.nextPageNo
        lazylist.hasNext = !!payload.hasNext
      }
    }
  })

  // 清空
  safeSet(store.mutations, NAME.clearMutation, (state) => (state[NAME.state] = new InfinateList()))

  // ----actions-----
  // 根据clear入参决定是否是刷新操作, 在请求完后再更新数据
  // 请求成功后再删除数据进行更新，保障若失败也能保留请求前的显示
  safeSet(store.actions, NAME.loadAction, async ({ state, rootState, commit, dispatch }, needClear) => {
    const list = state[NAME.state]
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
  })
  return store
}

export function DetailFactory(store = new Store(), { api, key }) {
  const name = key[0].toUpperCase() + key.slice(1)
  const NAME = {
    state: `${key}Detail`,
    modifyAction: `modify${name}`,
    removeAction: `remove${name}`
  }

  safeSet(store.state, NAME.state, {})

  safeSet(store.actions, NAME.modifyAction, ({ state, commit }, data) => {
    const isCreate = !data.id
    return Server({
      method: 'post',
      url: isCreate ? api.create : api.update,
      data
    })
  })

  safeSet(store.actions, NAME.removeAction, ({ state, commit }, data) => {
    return Server({
      method: 'delete',
      url: api.remove,
      data
    })
  })

  return store
}
// 有重名则不修改
function safeSet(obj, key, value) {
  if (typeof obj[key] === 'undefined') {
    obj[key] = value
  }
}
