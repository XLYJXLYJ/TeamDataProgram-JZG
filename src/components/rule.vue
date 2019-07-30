<template>
    <div class="welcome">
        <goBackNav :title='title'></goBackNav>
        <p class="about">{{message}}</p>
        <p class="rule">{{rules}}</p>
        <button class="confirm">{{buttonContent}}</button>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
export default {
    props:['title','message','rules','buttonContent','url'],
    components: {
        goBackNav
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
