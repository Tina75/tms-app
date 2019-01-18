import cityUtil from '@/libs/city'
export class Address {
  // 页面配置参数
  appButton = null
  dispatch = ''
  namespace = ''
  title = ''

  // 实际数据
  data = {
    // 需要设置的表单项
    address: '', // 详细地址
    additional: '', // 补充地址
    code: '', // 最深的code码, 省市区 则是区 省市则是市的code

    // 表单提交后将补充的内容
    lat: '',
    lon: '',
    locale: [], // 选中的完整城市信息
    addressDetail: null // 选中的百度地图列表项
    // any other customs
  }

  // 转化从store => form表单
  static toForm(store = {}) {
    return {
      additional: store.additional || '',
      address: store.address || '',
      addressDetail: null,
      locale: cityUtil.getPathByCode(store.code) || []
    }
  }

  // 在当前store.data的基础上结合表单内容构造新数据存入store 提供给其他页面使用
  // 表单值form => 塞回store.data
  static toStore(form, preData = {}) {
    let { code, address, additional, lat, lon, ...storeData } = preData
    const locale = form.locale
    storeData = {
      ...storeData,
      ...form,
      code: '',
      lat: '',
      lon: ''
    }

    const length = locale.length
    if (length) {
      let deeper = locale[length - 1]
      storeData.code = deeper.code
      storeData.lat = deeper.lat
      storeData.lon = deeper.lon
    }
    return storeData
  }
}
