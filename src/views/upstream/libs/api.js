import Server from '@/libs/server'
// 列表
export const initList = (data) => {
  return Server({
    method: 'post',
    url: '/busconnector/shipper/list',
    data
  })
}
// 详情
export const initDetail = (shipperOrderId) => {
  return Server({
    method: 'get',
    url: '/busconnector/shipper/detail',
    data: {
      shipperOrderId
    }
  })
}
// 接受
export const receipt = (id) => {
  return Server({
    method: 'POST',
    url: '/busconnector/shipper/accept',
    data: {
      shipperOrderIds: [Number(id)]
    }
  })
}
// 拒绝
export const refuse = (id) => {
  return Server({
    method: 'POST',
    url: '/busconnector/shipper/reject',
    data: {
      shipperOrderIds: [Number(id)]
    }
  })
}
