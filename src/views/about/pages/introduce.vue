<template>
  <div class="company-introduce">
    <div class="banner">
      <icon-font
        name="yzg-logo-1"
        :size="34"
        color="#189CB2"
        class="link-icon">
      </icon-font>
      <icon-font
        name="yzg-ico-text"
        :size="26"
        color="#25292E"
        class="link-icon">
      </icon-font>
    </div>
    <p>本运掌柜-司机版APP作为<strong>运掌柜TMS系统</strong>的一部分，主要面向运掌柜司机用户,隶属于南京智加云信息科技有限公司。作为国内领先的物流管理系统综合服务商，智加云致力于通过运用云计算、大数据、物联网等最新技术，全面赋能中国物流企业，为其提供领先的物流信息化及车辆管理等专业解决方案，有效提升物流企业的综合效益。</p>
    <p>本运掌柜-司机版APP可连接上游物流公司，司机用户可实时接收上游物流公司运单，并有短信及APP提醒；同时支持节点及在途信息实时反馈，异常随时上报；还可以到货签收支持上传电子回单，降低回单丢失、损毁风险，更安全省心。真正帮助司机朋友更好、更快完成运输任务，提升客户满意度。后期还将逐步上线里程测算、轨迹回放、路程导航、风险预警、油卡管理等功能，我们期待您的持续使用和关注。</p>
  </div>
</template>

<script>
import IconFont from '@/components/Iconfont'

export default {
  name: 'user-agreement',
  metaInfo: {
    title: '公司介绍'
  },
  components: { IconFont }
}
</script>
<style lang="stylus" scoped>
  .company-introduce
    min-height 100%
    background-color: #FFFFFF
    padding: 35px 30px 30px
    .banner
      text-align: center
      padding: 0 0 35px
      .iconfont
        display: inline-block
        vertical-align: middle
      .yzg-logo-1
        margin-top: 3px;
        margin-right: 5px;
    p
      font-size: 15px;
      color: #777777;
      line-height: 25px;
      margin-bottom: 30px;
      text-indent 26px
      strong
        font-weight: bold
</style>
