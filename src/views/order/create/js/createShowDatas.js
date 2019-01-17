import { getDistance } from '@/libs/util'
import NP from 'number-precision'

export default {
  // 设置选择后的发货人信息
  async setConsigner () {
    if (this.saveConsigner.id) {
      const info = this.orderInfo
      const consigner = this.saveConsigner
      info.consignerName = consigner.name || ''
      info.consignerContact = consigner.contact || ''
      info.consignerPhone = consigner.phone || ''
      info.consignerHourseNumber = consigner.consignerHourseNumber || ''
      info.settlementType = consigner.payType || ''
      info.pickup = consigner.pickUp || ''
      this.SET_OTHER_INFO({
        isInvoice: consigner.isInvoice || 0,
        invoiceRate: consigner.invoiceRate === null ? '' : consigner.invoiceRate,
        remark: consigner.remark
      })
      this.showOtherInfo()
      if (consigner.salesmanId) {
        const sales = await this.getOpetator()
        for (let i = 0; i < sales.length; i++) {
          if (sales[i].id === consigner.salesmanId) {
            this.SET_CONSUMER_INFO({
              salesmanId: consigner.salesmanId,
              salesmanName: sales[i].name
            })
            break
          }
        }
        this.showConsumerInfo()
      }
    }
  },
  // 设置选择后的收货人信息
  setConsignee () {
    if (!this.consigneeInfo) return
    const info = this.orderInfo
    const consignee = this.consigneeInfo.data
    info.consigneeContact = consignee.contact || ''
    info.consigneePhone = consignee.phone || ''
    info.consigneeCompanyName = consignee.consigneeCompanyName || ''
    info.end = consignee.cityCode || ''
    info.consigneeAddress = consignee.address || ''
    info.consignerHourseNumber = consignee.consignerHourseNumber || ''
    info.consigneeAddressLongitude = consignee.longitude || ''
    info.consigneeAddressLatitude = consignee.latitude || ''
    info.consigneeAddressText = info.consigneeAddress + info.consignerHourseNumber
    this.SET_CONSIGNEE_INFO(null)
  },
  // 联系电话格式化
  consignerPhoneInputHandler (phone) {
    this.phoneFormatter(phone, 'consignerPhone')
  },
  consigneePhoneInputHandler (phone) {
    this.phoneFormatter(phone, 'consigneePhone')
  },
  phoneFormatter (phone, field) {
    if (!phone || phone[0] !== '1') return
    phone = phone.trim().split(' ').join('')
    let phoneArr = []
    let phoneTemp = ''
    for (let i in phone) {
      i = Number(i)
      phoneTemp += phone[i]
      if (!phoneArr.length && i === 2) {
        phoneArr.push(phoneTemp)
        phoneTemp = ''
      } else if (phoneTemp.length === 4) {
        phoneArr.push(phoneTemp)
        phoneTemp = ''
      } else if (i === (phone.length - 1)) {
        phoneArr.push(phoneTemp)
        phoneTemp = ''
      }
    }
    this.$nextTick(() => {
      this.orderInfo[field] = phoneArr.join(' ')
    })
  },
  // 二级页面信息回显
  showConsumerInfo () {
    let infos = []
    if (this.consumerInfo.customerOrderNo) infos.push(this.consumerInfo.customerOrderNo)
    if (this.consumerInfo.customerWaybillNo) infos.push(this.consumerInfo.customerWaybillNo)
    if (this.consumerInfo.salesmanName) infos.push(this.consumerInfo.salesmanName)
    if (this.consumerInfo.deliveryTimeText) infos.push(this.consumerInfo.deliveryTimeText)
    if (this.consumerInfo.arriveTimeText) infos.push(this.consumerInfo.arriveTimeText)
    this.orderInfo.consumerInfo = infos.join('，')
  },
  showCargoList () {
    let infos = this.orderCargoList.map(item => item.cargoName)
    this.orderInfo.orderCargoList = infos.join('，')
  },
  showOtherInfo () {
    let infos = []
    if (this.otherInfo.isInvoice) infos.push(`开票税率${NP.times(this.otherInfo.invoiceRate, 100) || 0}%`)
    if (this.otherInfo.collectionMoney) infos.push(NP.divide(this.otherInfo.collectionMoney, 100) + '元')
    if (this.otherInfo.remark) infos.push(this.otherInfo.remark)
    this.orderInfo.otherInfo = infos.join('，')
  },
  async calculateDistance () {
    if (this.addressChanged &&
     this.orderInfo.consignerAddressLongitude &&
     this.orderInfo.consignerAddressLatitude &&
     this.orderInfo.consigneeAddressLongitude &&
     this.orderInfo.consigneeAddressLatitude) {
      this.TRIGGER_ADDRESS_CHANGE(false)
      const distance = await getDistance(
        { lng: this.orderInfo.consignerAddressLongitude, lat: this.orderInfo.consignerAddressLatitude },
        { lng: this.orderInfo.consigneeAddressLongitude, lat: this.orderInfo.consigneeAddressLatitude }
      )
      if (distance) this.orderInfo.mileage = NP.divide(distance, 1000)
    }
  },
  showFreightFee () {
    if (!this.calculatedAmount) return
    this.orderInfo.freightFee = this.calculatedAmount || ''
    this.CLEAR_CALCULATED_AMOUNT()
  }
}
