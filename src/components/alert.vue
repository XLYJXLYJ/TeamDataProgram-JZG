
<template>
<div>
      <!--弹窗的页面-->
         <div class="modalMask" v-show="isModel" @click="hidePanel"></div>
         <div class="modalDialog" v-show="changeModel">
           <div class="modalContent">
             <img src="/static/images/mask.png">
             <p class="contentTip">获取更多班组联系方式</p>
             <p class="detail">您已查看105个班组的联系方式，您可推荐新班组获得更多的权限。每成功推荐1个新班组，可增加100次的班组查看权限</p>
             <button>推荐班组</button>
           </div>
         </div>
</div>
</template>
 <script>
 export default {

  props: ['changeModel','isModel','val'],
  mounted() {
    console.log(this.changeModel)
  },
   methods: {
     //  弹框取消
     tapCancel() {
       console.log("取消");
       this.changeModel = !this.changeModel;
       this.isModel = !this.isModel;
     },
     //  确认
     confirmSend() {
       console.log("确认");
       this.changeModel = !this.changeModel;
       this.isModel = !this.isModel;
 
     },
     show_pro(val) {
         this.changeModel = !this.changeModel;
         this.isModel = !this.isModel;
     },
     hidePanel: function(event){
      //这句是说如果我们点击到了id为myPanel以外的区域
        this.$emit('func',false)
      }
   }
 };
 </script>
<style lang="scss" scoped>
.modalMask {
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0;
   left: 0;
   background: #000;
   opacity: 0.5;
   overflow: hidden;
   z-index: 9000;
   color: #fff;
 }
 .modalDialog {
   box-sizing: border-box;
   width: 590rpx;
   height: 736rpx;
   overflow: hidden;
   position: fixed;
   top: 30%;
   left: 0;
   z-index: 9999;
   background: #fff;
   margin: -180rpx 95rpx;
   border-radius: 8rpx;
 }
 .modalContent {
   box-sizing: border-box;
   display: flex;
   font-size: 32rpx;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   img{
     width: 590rpx;
     height: 340rpx;
     margin-bottom: 40rpx;
   }
   .contentTip{
      font-size: 34rpx;
      color: black;
      font-family: 'PingFangSC-Regular';
   }
   .detail{
      font-size: 30rpx;
      color: rgb(88, 88, 88);
      padding: 0 40rpx 0 40rpx;
      font-family: 'PingFangSC-Regular';
   }
   button{
     width: 490rpx;
     height: 96rpx;
     margin-top: 40rpx;
     font-size: 34rpx;
      color: black;
      font-family: 'PingFangSC-Medium';
      font-weight: 550;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgb(252, 184, 19)
   }
 }
</style>

