import Server from '@/libs/server'

const CONFIG = [
  {
    key: 'contact',
    api: {
      create: '/carrier/add/for/company',
      update: '/carrier/for/company/update',
      remove: '/carrier/delete'
    }
  },
  {
    key: 'truck',
    api: {
      create: '/carrier/add/vehicle',
      update: '/carrier/update/vehicle',
      remove: '/carrier/delete/vehicle'
    }
  }
]

const ACTIONS = {
  loadCarrierDetail ({ commit }, carrierId) {
    return Server({
      url: '/carrier/details/for/company',
      method: 'get',
      params: { carrierId }
    }).then(response => commit('setCarrierDetail', response.data.data.carrierInfo))
  },
  loadTruckDetail ({ state, commit }, carId) {
    return Server({
      url: '/ownerCar/queryCarDetail',
      method: 'get',
      params: { carId }
    }).then(response => commit('setTruckDetail', response.data.data))
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
