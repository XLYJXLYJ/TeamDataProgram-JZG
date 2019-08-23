<template>
        <div>
            <!--弹窗的页面-->
            <div class="modalMask" v-show="isModel" @click="hidePanel"></div>
            <div class="modalDialog" v-show="changeModel">
                <div class="modalContent">
                    <p class="contentTip">优质班组数据库请求获取您的微信昵称、头像等公开信息，以便继续使用建筑业优质班组数据库</p>
                    <p class="alert" @click="closeAlert"><button open-type="getUserInfo" @getuserinfo="getUserInfo">好的</button></p> 
                </div>
            </div>
            <swiper
                :indicator-dots="true"
                autoplay
                :interval="5000"
                :duration="500"
                circular
                indicator-color="rgba(255,255,255,.5)"
                indicator-active-color="#ffffff"
                style="height:402rpx"
            >
                <block v-for="item in imgUrls" :key="item.id">
                    <swiper-item>
                        <image :src="item.img" class="slide-image" @click="goshare(item.url,item.order)"/>
                        <!-- <text class="text1">{{cit}}{{item.desc}}</text>
                        <text class="text2">查看详情</text> -->
                    </swiper-item>
                </block>
            </swiper>
        </div>
</template>

<script>
import fly from "@/services/WxApi";
export default {
    props:['cit'],
    data() {
        return {
            imgUrls:'',
            selectNavIndex:0,
            changeModel:false,
            isModel:false,
        };
    },
    mounted() {
        let This = this
        fly.post('/contractor/getBanner',{bannerType: 200}).then(function (data) {
            This.imgUrls = data.response
        })
    },
    methods: {
        getUserInfo (e) {
            let This = this
            let userInfo = JSON.parse(e.mp.detail.rawData)
            This.changeModel = false
            This.isModel = false
            wx.login({
                success (res) {
                    if (res.code) {
                    //发起网络请求
                        let data = {
                            nickName:userInfo.nickName,
                            code:res.code,
                            headImg:userInfo.avatarUrl,
                            gender:userInfo.gender,
                            areaName:[userInfo.country,userInfo.province,userInfo.city]
                        }
                        fly.post('/contractor/weChatAuth',data).then(function (res) {
                            if(res.response.headImg == null){
                              wx.setStorageSync('img','/static/images/user.png')
                            }else{
                                wx.setStorageSync('img',res.response.headImg)
                            }
                            
                            wx.setStorageSync('joinSharePlanStatus',res.response.joinSharePlanStatus)
                            wx.setStorageSync('token', res.response.authorization) 
                            if(res.response.gender == 1 ){
                                wx.setStorageSync('gender', '男') 
                            }else{
                                wx.setStorageSync('gender', '女') 
                            }
                            wx.setStorageSync('mobile', res.response.mobile) 
                            wx.setStorageSync('nickName', res.response.nickName) 
                            wx.setStorageSync('username', res.response.username) 
                            if(This.path == '/pages/register/main'){
                                if(res.response.joinSharePlanStatus==0){
                                    wx.redirectTo({
                                        url:'/pages/register/main'
                                    });
                                }else{
                                    wx.reLaunch({
                                        url:'/pages/sharing/main'
                                    });
                                }
                            }else{
                                wx.reLaunch({
                                    url:This.path
                                });
                            }
                            // wx.reLaunch({
                            //     url:'/pages/registerClass/main'
                            // })
                            This.test(res.response)
                            // This.$emit('info',res.response)
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        closeAlert(){
            let This = this
            This.changeModel = false
            This.isModel = false 
        },
        goshare(){
            wx.reLaunch({
                url:'/pages/commonMake/main'
            })
        },
        goshare(url,order){
            let This = this
            if(order==1){
                if(!wx.getStorageSync('token')){
                    This.changeModel = true
                    This.isModel = true
                }else{
                    fly.post('/contractor/getMySharingPlan').then(function (res) {
                        let data = res.response
                        wx.setStorageSync('joinSharePlanStatus',data.reviewStatus)
                        if(data.reviewStatus==0){
                            wx.reLaunch({
                                url:'/pages/welcome/main'
                            })
                        }
                        else{
                            wx.reLaunch({
                                url:'/pages/sharing/main'
                            })
                        }
                    })
                }
            }else{
                console.log(url)
                wx.reLaunch({
                    url:url
                })
            }
        }
    },
};
</script>

<style scoped lang='scss'>
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
    .alert{
        width:100%;
        height: 96rpx;
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
        border-top: 1px solid #e5e5e5;
    }
}
image {
    width: 100%;
    border-radius: 8rpx;
}
.text1{
    width: auto;
    position: absolute;
    top:25%;
    left: 16%;
    font-family: 'PingFang-SC-Heavy';
    font-size: 44rpx;
    font-weight: 650;
}
.text2{
    width: auto;
    position: absolute;
    top:65%;
    left: 42%;
    font-family: 'PingFangSC-Regular';
    font-size: 24rpx;
}
</style>
