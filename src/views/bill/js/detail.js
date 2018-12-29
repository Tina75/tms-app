import bridge from '@/libs/dsbridge'

export const getFields = (fieldKeys = [], object = {}) => {
  let fields = {}
  fieldKeys.forEach(item => {
    if (!(item instanceof Array)) {
      fields[item] = object[item]
    } else {
      fields[item[1]] = object[item[0]]
    }
  })
  return fields
}

export const getBillStatus = status => {
  switch (status) {
    case 1:
      return { title: '待装货', tip: '请按照约定时间赶往装货地点', icon: 'yzg-hebingxingzhuang', upload: true }
    case 2:
      return { title: '运输中', tip: '到达目的地后点击确认送达按钮', icon: 'yzg-hebingxingzhuang4', upload: false }
    case 3:
      return { title: '已送达', tip: '货物已送达目的地，别忘了上传回单照片', icon: 'yzg-dagou_wuquan', upload: true }
    case 4:
      return { title: '已回单', tip: '货主已收到回单', icon: 'yzg-hebingxingzhuang1', upload: false }
    default:
      return {}
  }
}

export const setRightButton = vm => {
  bridge.register(
    'oddUpload',
    function () {
      vm.$router.push({
        name: 'odd-upload',
        params: { id: vm.billInfo.billId },
        query: { type: vm.billInfo.billType }
      })
    },
    false
  )
  bridge.call(
    'ui.setRightButtonAction',
    { text: '上报异常', action: 'oddUpload', color: '#189CB2' },
    function (res) {}
  )
}

export const clearRightButton = () => {
  bridge.call(
    'ui.setRightButtonAction',
    { text: '', action: '' },
    function (res) {}
  )
}
