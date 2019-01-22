import Server from '@/libs/server'
// 列表
export const initList = (data) => {
  return Server({
    method: 'post',
    url: '/order/getReceiptOrderListNew',
    data,
    loading: true
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
    url: '/order/getAppReceiptOrderNumByStatus'
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
// 上传回单
export const uploadReceiptPic = (data) => {
  return Server({
    method: 'post',
    url: '/order/updateReceiptOrderPhotoUrl',
    data
  })
}
