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

export const getSatatusNum = () => {
  return Server({
    method: 'get',
    url: '/order/getReceiptOrderNumByStatus'
  })
}
