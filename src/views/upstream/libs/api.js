import Server from '@/libs/server'

export const initList = (data) => {
  return Server({
    method: 'post',
    url: '/busconnector/shipper/list',
    data
  })
}
export const initDetail = (shipperOrderId) => {
  return Server({
    method: 'get',
    url: '/busconnector/shipper/detail',
    data: {
      shipperOrderId
    }
  })
}

export const refuse = (id) => {
  return Server({
    method: 'POST',
    url: '/busconnector/shipper/reject',
    data: {
      shipperOrderIds: [Number(id)]
    }
  })
}

export const receipt = (id) => {
  return Server({
    method: 'POST',
    url: '/busconnector/shipper/accept',
    data: {
      shipperOrderIds: [Number(id)]
    }
  })
}
