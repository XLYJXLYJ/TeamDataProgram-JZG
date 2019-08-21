
<template>
    <div>
        <!--弹窗的页面-->
        <div class="modalMask" v-show="isModel" @click="hidePanel"></div>
        <div class="modalDialog" v-show="changeModel">
            <div class="modalContent">
                <img src="/static/images/share.png" />
                <p class="contentTip">{{title}}</p>
                <p class="detail">{{content}}</p>
                <button @click="goWhere">{{text}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import fly from "@/services/WxApi";
export default {
    props: ["changeModel", "isModel", "val"],
    data() {
        return {
            remainCount:'',
            title:'',
            content:'',
            text:''
        }
    },
    mounted() {
        let This = this
        if(This.val.alertType==1){
            This.title = '查看联系方式'
            This.content = '您已查看 '+This.val.viewCount+' 个班组的联系方式，您剩余 '+This.val.remainCount+' 次班组联系方式查看机会。'
            This.text = '好的'
        }else if(This.val.alertType==2){
            This.title = '查看联系方式'
            This.content = '您已查看 '+This.val.viewCount+' 个班组的联系方式，请加入共建共享计划获得更多权限，成功通过审核，可增加 100 次的班组查看权限。'
            This.text = '立即加入共建共享计划'
        }else{
            This.title = '获取更多班组联系方式'
            This.content = '您已查看 '+This.val.viewCount+' 个班组的联系方式，您可推荐新班组获得更多的权限。每成功推荐1个新班组，可增加 100 次的班组查看权限'
            This.text = '推荐班组'
        }
        This.remainCount = This.val.remainCount
    },
    methods: {
        hidePanel: function(event) {
            //这句是说如果我们点击到了id为myPanel以外的区域
            this.$emit("func", false);
        },
        goWhere(){
            let This = this
            if(This.text == '好的'){
                This.changeModel = !This.changeModel;
                This.isModel = !This.isModel;
                This.$emit("func", false);
            }else if(This.text == '立即加入共建共享计划'){
                wx.reLaunch({
                    url:'/pages/welcome/main'
                })
            }else{
                wx.reLaunch({
                    url:'/pages/welcomeClass/main'
                })
            }
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
    height: auto;
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
    img {
        width: 590rpx;
        height: 340rpx;
        margin-bottom: 40rpx;
    }
    .contentTip {
        font-size: 34rpx;
        color: black;
        font-family: "PingFangSC-Regular";
    }
    .detail {
        font-size: 30rpx;
        color: rgb(88, 88, 88);
        padding: 0 40rpx 0 40rpx;
        font-family: "PingFangSC-Regular";
    }
    button {
        width: 510rpx;
        height: 96rpx;
        margin-top: 20rpx;
        font-size: 34rpx;
        color: black;
        font-family: "PingFangSC-Medium";
        font-weight: 550;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(252, 184, 19);
        border: none;
        margin-bottom: 40rpx;
    }
}
</style>

