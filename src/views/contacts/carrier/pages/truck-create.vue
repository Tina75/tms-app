<template>
  <div class="cube-has-bottom-btn cube-pt-10 truck-create">
    <FromGroup :rules="rules" >
      <FormItem v-model="model.carNO" label="车牌号" maxlength="20" prop="require"/>
      <FormItem v-model="model.driverName" label="司机姓名" maxlength="15" prop="require"/>
      <FormItem v-model="model.driverPhone" label="手机号" maxlength="15" prop="require"/>
      <FormItem
        v-model="model.driverType"
        label="合作方式"
        placeholder="请选择"
        type="select"
        class="cube-mb-15"
        :bottom-line="false"
        :options="options.driverType"
        prop="require"
      />

      <FormItem
        v-model="model.carType"
        label="车型"
        placeholder="请选择"
        type="select"
        :options="options.carType"
      />
      <FormItem
        v-model="model.carLength"
        label="车长"
        placeholder="请选择"
        type="select"
        :options="options.carLength"
      />
      <FormItem v-model="model.shippingWeight" label="载重（吨）" maxlength="15"/>
      <FormItem v-model="model.shippingVolume" label="净空（方）" maxlength="15"/>
      <FormItem v-model="model.driverPhone" label="品牌" maxlength="15"/>

      <FormItem
        v-model="purchDate"
        label="购买日期"
        placeholder="请选择"
        type="click"
        class="cube-mb-15"
        :bottom-line="false"
        @on-click="showDatePicker"
      />

      <card class="cube-mb-15" title="常跑线路">
        <form-item
          v-model="model.regularLine"
          type="click"
          label="出发地1"
          placeholder="请选择出发地城市"
          @on-click="showPickCity = true"
        />
        <form-item
          v-model="model.regularLine"
          type="click"
          label="目的地1"
          placeholder="请选择目的地城市"
          @on-click="showPickCity = true"
        />
        <form-item
          v-model="model.regularLine"
          type="click"
          label="出发地2"
          placeholder="请选择出发地城市"
          @on-click="showPickCity = true"
        />
        <form-item
          v-model="model.regularLine"
          type="click"
          label="目的地2"
          placeholder="请选择目的地城市"
          @on-click="showPickCity = true"
        />
      </card>

      <card class="cube-mb-15" title="证件上传">
        <div class="uploadWrap">
          <upload v-model="model.drivePhoto" label="点击上传行驶证"/>
          <upload v-model="model.travelPhoto" label="点击上传道路运输证"/>
        </div>
      </card>

      <FormItem v-model="model.remark" maxlength="200" type="textarea" label="备注"/>
    </FromGroup>
    <LoadingButton :loading="submiting" class="cube-bottom-button" @click="submit"/>
    <CityPicker
      v-model="showPickCity"
      @confirm="citySelect"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingButton from '@/components/LoadingButton'
import FromGroup from '@/components/Form/FormGroup'
import FormItem from '@/components/Form/FormItem'
import { TruckDetail } from '../modules/model'
import CityPicker from '@/components/CityPicker'
import Upload from '../../components/Upload'
import Card from '../../components/Card'
const moudleName = 'contacts/carrier'
export default {
  name: 'ModifyContactsCarrierTruck',
  metaInfo() {
    return {
      title: this.isCreate ? '新增车辆' : '修改车辆'
    }
  },
  components: { FormItem, FromGroup, LoadingButton, CityPicker, Upload, Card },
  data() {
    return {
      model: new TruckDetail(),
      options: {
        carType: TruckDetail.carType,
        driverType: TruckDetail.driverType,
        carLength: TruckDetail.carLength
      },
      rules: {
        require: {
          required: true
        }
      },
      submiting: false,
      purchDate: '', // 生产日期
      showPickCity: false,
      regularLine: [] // 常发线路
    }
  },
  computed: {
    ...mapGetters(moudleName, ['truckDetail']),
    isCreate() {
      return !this.truckDetail.id
    }
  },
  methods: {
    ...mapActions(moudleName, ['modifyTruck']),
    async submit() {
      this.submiting = true
      try {
        this.model.carrierId = this.$route.query.carrierId
        await this.modifyTruck(TruckDetail.toServer(this.model))
        this.afterSubmit()
      } catch (e) {
        console.error(e)
      } finally {
        this.submiting = false
      }
    },

    onRefreshPage() {
      this.model = this.isCreate
        ? new TruckDetail()
        : TruckDetail.toFrom(this.TruckDetail)
    },

    /* 提交成功后续操作 */
    afterSubmit () {
      this.$refreshPage('contacts-carrier-truck', 'contacts-carrier-truck-detail')
      this.$createToast({
        time: 1500,
        txt: this.isCreate ? '新增车辆成功' : '修改车辆成功'
      }).show()
      this.$router.back()
    },

    showDatePicker() {
      const self = this
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '请选择',
          value: new Date(),
          onSelect: (date, val, text) => {
            self.purchDate = text.join('-')
            self.model.purchDate = date.getTime()
          }
        })
      }
      this.datePicker.show()
    },

    citySelect (city) {
      // console.log(picker)
      // if (picker[0].name === picker[1].name) {
      //   this.formList.address = picker[1].name + picker[2].name
      // } else {
      //   this.formList.address = picker[0].name + picker[1].name + picker[2].name
      // }
    }
  }
}
</script>
<style lang='stylus' scoped>
.truck-create
  height auto
  min-height 100%
  background #efeff4
  .uploadWrap
    display flex
    padding 0 15px 15px
</style>
