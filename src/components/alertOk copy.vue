
<template>
    <div>
        <!--弹窗的页面-->
        <div class="modalMask" v-show="isModel" @click="hidePanel"></div>
        <div class="modalDialog" v-show="changeModel">
            <div class="modalContent">
                <p class="contentTip">优质班组数据库请求获取您的微信昵称、头像等公开信息，以便继续使用建筑业优质班组数据库</p>
                <button open-type="getUserInfo" @getuserinfo="getUserInfo">好的</button>
            </div>
        </div>
    </div>
</template>
 <script>
import fly from "@/services/WxApi";
export default {
    props: ["changeModel", "isModel", "path"],
    mounted() {
        console.log(this.changeModel)
        console.log(this.isModel)
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
        hidePanel: function(event) {
            //这句是说如果我们点击到了id为myPanel以外的区域
            this.$emit("func", false);
        },
        getUserInfo (e) {
            console.log(e)
            let This = this
            let userInfo = JSON.parse(e.mp.detail.rawData)
            console.log(userInfo)
            let data = {
                nickName:userInfo.nickName,
                headImg:userInfo.avatarUrl,
                gender:userInfo.gender,
                areaName:[userInfo.country,userInfo.province,userInfo.city]
            }
            fly.post('/contractor/weChatAuth',data).then(function (res) {
                console.log(res)
                wx.setStorageSync('token', res.response.authorization) 
                wx.setStorageSync('gender', res.response.gender) 
                wx.setStorageSync('mobile', res.response.mobile) 
                wx.setStorageSync('nickName', res.response.nickName) 
                wx.setStorageSync('username', res.response.username) 
                wx.navigateTo({
                    url:This.path
                });
                This.changeModel = false
                This.isModel = false
            })
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
    height: 332rpx;
    overflow: hidden;
    position: fixed;
    top: 50%;
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
        display: flex;
        justify-content: center;
        width: 514rpx;
        padding-top: 42rpx;
    }
    button {
        width: 100%;
        height: 96rpx;
        margin-top: 40rpx;
        font-size: 34rpx;
        color: rgb(252, 184, 19);
        font-family: "PingFangSC-Medium";
        font-weight: 550;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-bottom: none;

    }
}
</style>

