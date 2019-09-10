<template>
    <section class="tabBar-wrap">
        <div>
            <!--弹窗的页面-->
            <div class="modalMask" v-show="isModel" @click="hidePanel"></div>
            <div class="modalDialog" v-show="changeModel">
                <div class="modalContent">
                    <p class="contentTip">优质班组数据库请求获取您的微信昵称、头像等公开信息，以便继续使用建筑业优质班组数据库</p>
                    <p class="alert" @click="closeAlert"><button open-type="getUserInfo" @getuserinfo="getUserInfo">好的</button></p> 
                </div>
            </div>
        </div>
        <article class="tabBar-box">
            <ul class="tabBar-nav" v-if="navList.length > 0">
                <li class="item" v-for="(item, index) in navList" @click="selectNavItem(index,item.pagePath)" :key="index">
                        <p class="item-images">
                            <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath"/>
                        </p>
                        <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
                            {{item.text}}
                        </p>
                </li>
            </ul>

        </article>
        <div class="res">推荐班组</div>
        <button style="border:none;" @click="isOk"> <img class="buttom-img" src="/static/images/button.png"> </button>

    </section>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import {  USER_INFO } from '../store/modules/mutation-type'
import fly from "@/services/WxApi";
import alertOk from "@/components/alertOk.vue";
export default {
    props: ["selectNavIndex", "needButton", "handButton", "btnText"],
    components:{
        alertOk
    },
    data() {
        return {
            changeModel:false,
            isModel:false,
            path:'',
            navList: [
                {
                    selectedIconPath: "/static/tabs/home-active.png",
                    iconPath: "/static/tabs/home.png",
                    pagePath: "/pages/index/main",
                    text: "班组库"
                },
                {
                    selectedIconPath: "/static/tabs/orders-active.png",
                    iconPath: "/static/tabs/orders.png",
                    pagePath: "/pages/index/main",
                    text: "我"
                }
            ]
        };
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    mounted() {

    },
    onhide(){
        let This = this
        This.changeModel = false
        This.isModel = false 
    },
    methods: {
        ...mapMutations([
            USER_INFO
        ]),
        test(data1){
            let This = this
            This[USER_INFO](data1)
        },
        closeAlert(){
            let This = this
            This.changeModel = false
            This.isModel = false 
        },
        selectNavItem(index, pagePath) {
            let This = this
            if (index === this.selectNavIndex) {
                return false;
            }
            if(index==1){
                if(!wx.getStorageSync('token')){
                    This.changeModel = true
                    This.isModel = true
                    This.path = pagePath
                }else{
                    // This.bindViewTap(pagePath);
                }
            }else{
                This.changeModel = false
                This.isModel = false
                // This.bindViewTap(pagePath);
            }
            This.$emit('indexId',index)
            // if (index == 0 && this.selectNavIndex == -1) {
            // this.$emit("fetchIndex",index);
            // }
        },
        bindViewTap(url) {
            let page = getCurrentPages();
            wx.reLaunch({
                url
            });
        },
        hidePanel: function(event) {
            //这句是说如果我们点击到了id为myPanel以外的区域
            let This = this
            This.changeModel = true
            This.isModel = true
            This.$emit("func", false);
        },
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
                            // This.test(res.response)
                            // This.$emit('info',res.response)
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        },
        isOk(){
            let This = this
            if(!wx.getStorageSync('token')){
                This.changeModel = true
                This.isModel = true
                This.path = '/pages/login/main'
            }else{
                if(wx.getStorageSync('joinSharePlanStatus')==1){
                    wx.redirectTo({
                        url:'/pages/registerClass/main'
                    })
                }else if(wx.getStorageSync('joinSharePlanStatus')==0){
                    wx.showToast({
                        title: "未加入共建共享",
                        icon: "none",
                        duration: 1000
                    });
                }else if(wx.getStorageSync('joinSharePlanStatus')==2){
                    wx.showToast({
                        title: "共建共享未审核通过",
                        icon: "none",
                        duration: 1000
                    });
                }else if(wx.getStorageSync('joinSharePlanStatus')==3){
                    wx.showToast({
                        title: "共建共享审核中",
                        icon: "none",
                        duration: 1000
                    });
                }else{
                    wx.showToast({
                        title: "未登录，请先登录",
                        icon: "none",
                        duration: 1000
                    });  
                }
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
        color: #FCB813;
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
.tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1rpx solid #fbfbfb;
    background-color: #fff;
}
.tabBar-nav {
    width: 100%;
    display: flex;

    .item {
        flex: 1;
        text-align: center;
    }
    .item-text {
        color: #666;
        font-size: 20rpx;
        transition: 0.24s linear;
        margin-top: -8rpx;
    }
    .item-text-active {
        color: #FCB813;
        margin-top: -8rpx;
    }
    .item-images {
        width: 40rpx;
        height: 40rpx;
        margin: 20rpx auto;
        margin-bottom: 5rpx;
        text-align: center;
        transition: 0.24s linear;
        & img {
            display: inline;
        }
    }
}
button::after{
    outline: none;
    border: none;
}
.buttom-img{
    position: fixed;
    bottom: 32rpx;
    left: 327rpx;
    width: 126rpx;
    height: 126rpx;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
    border-radius: 48rpx;
}
.res{
    z-index: 999;
    position: fixed;
    left: 350rpx;
    bottom: 12rpx;
    font-size: 20rpx;
}
</style>