export const PLOT_CODES = [
  { value: 1, text: '装货环节' },
  { value: 2, text: '送货环节' },
  { value: 3, text: '卸货环节' }
]
export const TYPE_CODES = {
  // 装货环节
  1: [
    { value: 1, text: '货损' },
    { value: 2, text: '货单不符' },
    { value: 3, text: '超重超方' },
    { value: 4, text: '投诉' },
    { value: 5, text: '其他' }
  ],
  // 送货环节
  2: [
    { value: 1, text: '货损' },
    { value: 2, text: '少货' },
    { value: 3, text: '多货' },
    { value: 4, text: '超时' },
    { value: 5, text: '投诉' },
    { value: 6, text: '其他' }
  ],
  // 卸货环节
  3: [
    { value: 1, text: '货损' },
    { value: 2, text: '少货' },
    { value: 3, text: '多货' },
    { value: 4, text: '超时' },
    { value: 5, text: '拒收' },
    { value: 6, text: '投诉' },
    { value: 7, text: '其他' }
  ]
}
