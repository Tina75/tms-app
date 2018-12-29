export const SETTLEMENT_TYPE = {
  TIMES: 1, // 单结
  MONTH: 2 // 月结
}

export const ASSIGN_CAR_TYPE = {
  TRANSFER: 1, // 外转
  SELF: 2 // 自送
}

// 付款方式
export const PAY_TYPE = {
  1: '预付',
  2: '到付',
  3: '回付',
  4: '尾款'
}

// 单据类型
export const BILL_TYPE = {
  LOADBILL: 1,
  WAYBILL: 2
}

// 修改订单状态
export const BILL_STATUS = {
  HAS_PACKED: 1,
  HAS_ARRIVED: 2
}

// 单据异常
export const BILL_ABNORMAL = {
  ABNORMAL_NONE: 1,
  ABNORMAL_HAS: 2
}
