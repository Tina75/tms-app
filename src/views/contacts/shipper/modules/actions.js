import Server from '@/libs/server'

const CONFIG = [
  {
    key: 'contact',
    api: {
      create: '/consigner/add',
      update: '/consigner/update',
      remove: '/consigner/delete'
    }
  },
  {
    key: 'address',
    api: {
      create: '/consigner/address/add',
      update: '/consigner/address/update',
      remove: '/consigner/address/delete'
    }
  },
  {
    key: 'cargo',
    api: {
      create: '/consigner/cargo/add',
      update: '/consigner/cargo/update',
      remove: '/consigner/cargo/delete'
    }
  }
]

const ACTIONS = {
  // 同步对接业务员
  syncButtOperator({ state, commit }) {
    return Server({
      method: 'get',
      url: '/permission/buttOperator'
    }).then((response) => commit('setOperatpr', response.data.data))
  }
}
// 批量生成actions
CONFIG.forEach(factory)

export default ACTIONS

function factory({ api, key }) {
  const name = key[0].toUpperCase() + key.slice(1)
  const NAME = {
    modifyAction: `modify${name}`,
    removeAction: `remove${name}`
  }

  ACTIONS[NAME.modifyAction] = ({ state, commit }, data) => {
    const isCreate = !data.id
    return Server({
      method: 'post',
      url: isCreate ? api.create : api.update,
      data
    })
  }

  ACTIONS[NAME.removeAction] = ({ state, commit }, id) => {
    return Server({
      method: 'delete',
      url: api.remove,
      data: {
        id
      }
    })
  }
}
