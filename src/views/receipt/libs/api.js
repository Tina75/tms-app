import Server from '@/libs/server'
// 列表
export const initList = (data) => {
  return Server({
    method: 'post',
    url: '/order/getReceiptOrderListNew',
    data
  })
}
// 详情
export const initDetail = (id) => {
  return Server({
    method: 'get',
    url: '/order/getReceiptOrderDetail',
    data: {
      id
    }
  })
}
// 条数
export const getSatatusNum = () => {
  return Server({
    method: 'get',
    url: '/order/getReceiptOrderNumByStatus'
  })
}
// 回收返厂
export const updateReceipt = (data) => {
  return Server({
    method: 'post',
    url: '/order/updateReceiptOrder',
    data
  })
}
