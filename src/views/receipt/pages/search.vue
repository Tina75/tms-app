<template>
  <div>
    <form-item v-model="form.value" label="始发地"/>
    <form-item v-model="form.value" label="目的地"/>
    <form-item v-model="form.value" label="发货方名称"/>
    <form-item v-model="form.value" label="订单号"/>
    <form-item v-model="form.value" label="客户单号"/>
    <form-item v-model="form.value" label="承运商"/>
    <form-item v-model="form.value" label="司机"/>
    <form-item v-model="form.value" label="司机手机号"/>
    <form-item v-model="form.value" label="回收日期"/>
    <form-item v-model="form.value" label="返厂日期"/>
  </div>
</template>
<script>
import { FormItem } from '@/components/Form'
export default {
  name: 'recept-search',
  metaInfo: {
    title: '回单搜索'
  },
  components: { FormItem },
  data () {
    return {
      form: {
        value: ''
      }
    }
  },
  methods: {
    save () {
      this.$router.push({ name: 'company' })
    }
  }
}
</script>
