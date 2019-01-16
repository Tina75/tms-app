<template>
  <div class="about-us">
    <cell-group>
      <cell-item label="公司介绍" :route="{ name: 'introduce' }"/>
      <cell-item label="用户协议" :route="{ name: 'introduce' }"/>
      <cell-item label="隐私协议" :route="{ name: 'introduce' }"/>
    </cell-group>
  </div>
</template>

<script>
import CellGroup from '@/components/CellGroup'
import CellItem from '@/components/CellItem'

export default {
  name: 'about',
  metaInfo: {
    title: '关于我们'
  },
  components: { CellGroup, CellItem }
}
</script>
