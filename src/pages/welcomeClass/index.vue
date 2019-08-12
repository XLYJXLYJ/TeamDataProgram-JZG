<template>
    <div class="welcome">
        <rule title="" message='欢迎推荐优质班组，与众多行业资深管理者联合打造实名、专业、优质的班组资源数据库，推动行业进步！' rules='《建筑业优质班组共建共享计划规则》' buttonContent='立即推荐班组' url='/pages/registerClass/main'></rule>
    </div>
</template>

<script>
import rule from "@/components/rule.vue";
export default {
    components: {
        rule
    },
}
</script>

<style scoped lang='scss'>
.welcome {
    width: 100%;
    height: 100%;
    .about{
    width: 670rpx;
    margin: 0 auto;
    font-size: 48rpx;
    color:block;
    font-family: 'PingFangSC-Regular';
    margin-top: 96rpx;
  }
    .confirm{
      width: 670rpx;
      background:#FCB813;
      margin-bottom:24rpx;
      font-size:34rpx;
      font-family:'PingFangSC-Medium';
      position: absolute;
      bottom: 40rpx;
      left: 40rpx;
      font-weight: 550;
    }
    .rule{
        color:#FCB813;
        width: 670rpx;
        margin-left: 20rpx;
        margin-top: 48rpx;

    }
}
</style>
