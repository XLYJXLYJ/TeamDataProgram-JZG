<template>
    <div class="login">
        <goBackNav title="登陆/注册建造工" :url='url'></goBackNav>
        <div v-if="isAlert">
            <selfAlert
                v-bind:changeModel="ischangeModel"
                v-bind:isModel="ifMode"
                v-bind:val="0"
                @func="controlAlert"
            ></selfAlert>
        </div>
        <div class="contain">
            <form>
                <div class="get-block">
                    <p class="title">手机号码</p>
                    <input type="text" v-model="phone" placeholder="请输入手机号码" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="get-block">
                    <p class="title">验证码</p>
                    <div class="get-code">
                        <input
                            type="text"
                            v-model="phone_code"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            placeholder-style="color:#ccc;"
                        />
                        <p @click="GetCode" :class="{getCode:btn, getCodeDisabled:!btn}">{{btnTxt}}</p>
                        <!-- <p @click="GetCode" class="getCodeDisabled">{{btnTxt}}</p> -->
                    </div>
                </div>
                <div>
                    <button class="confirm" @click="login">提交</button>
                </div>
                <p class="title">
                    建筑业优秀班组数据库是建造工平台提供的服务，点击提交即表示同意
                    <span style="color:#fcb813;" @click="goUser">《建造工用户协议》</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import {  USER_INFO } from '../../store/modules/mutation-type'
import goBackNav from "@/components/goIndex01.vue";
import fly from "@/services/WxApi";
export default {
    components: {
        goBackNav,
    },
    data() {
        return {
            Timeout:'',
            phone: "",
            phone_code: "",
            name: "",
            company: "",
            position: "",
            btnTxt: "获取验证码",
            disabled: false,
            time: 0, // 验证码时间初始化
            btn: true,
            url:''
        };
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    mounted() {
        let This = this
        This.url = getCurrentPages()
        This.url = This.url[0].__displayReporter.showReferpagepath.split('.')
        This.url = '/' +  This.url[0]
    }, 
    destroyed() {
        let This = this
        clearTimeout(This.Timeout)
    },
    methods: {
        ...mapMutations([
            USER_INFO
        ]),
        test(data1){
            let This = this
            This[USER_INFO](data1)
        },
        GetCode() {
            if (!this.phone) {
                wx.showToast({
                    title: "请输入手机号",
                    icon: "none",
                    duration: 2000
                })
            } else if (this.phone.length !== 11) {
                wx.showToast({
                    title: "请输入正确手机号格式",
                    icon: "none",
                    duration: 2000
                })
            } else {
                if (this.time == 0) {
                    this.time = 60;
                    this.Timer();
                    this.send()
                } else {
                    console.log("不能重复发送验证码");
                }
            }
        },
        send(){
            let This = this
            let data = {
                mobile:This.phone
            }
            fly.post('/contractor/getVerificationCode',data).then(function (res) {
            })
        },
        login(){
            let This = this
            let data = {
                mobile:This.phone,
                vaCode:This.phone_code
            }
            fly.post('/contractor/login',data).then(function (res) {
                // wx.showToast({
                //     title: "申请加入成功",
                //     icon: "none",
                //     duration: 2000
                // });
                wx.setStorageSync('token', res.response.authorization) 
                wx.setStorageSync('joinSharePlanStatus',res.response.joinSharePlanStatus)
                if(res.response.gender == 1 ){
                    wx.setStorageSync('gender', '男') 
                }else{
                    wx.setStorageSync('gender', '女') 
                }
                wx.setStorageSync('mobile', res.response.mobile) 
                wx.setStorageSync('nickName', res.response.nickName) 
                wx.setStorageSync('username', res.response.username) 
                // This.test(res.response)
                wx.setStorageSync('img',res.response.headImg)
                wx.showToast({
                    title: "登录成功",
                    icon: "none",
                    duration: 1000
                });
                This.Timeout = setTimeout(function(){
                    wx.reLaunch({
                        url:'/pages/index/main'
                    });
                },1000)
            })
        },
        Timer() {
            if (this.time > 0) {
                this.time--;
                this.btnTxt = this.time + "s后重新发送";
                setTimeout(this.Timer, 1000);
                this.btn = false;
            } else {
                this.time = 0;
                this.btnTxt = "获取验证码";
                this.btn = true;
            }
        },
        goUser(){
            wx.reLaunch({
                url:'/pages/userAgreement/main'
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    .contain {
        width: 670rpx;
        margin: 0 auto;
        margin-top: 40rpx;
        .get-block {
            border-bottom: 1rpx solid #e5e5e5;
            margin-bottom: 48rpx;
            .get-code {
                display: flex;
                justify-content: space-between;
            }
            input{
                 height: 50rpx;
               
            }
        }
        .img-block {
            width: 100%;
            height: 330rpx;
        }
        .title {
            font-size: 28rpx;
            color: black;
            font-family: "PingFangSC-Regular";
            margin-bottom: 16rpx;
        }
        input {
            padding-bottom: 16rpx;
        }
        .confirm {
            background: #fcb813;
            margin-bottom: 24rpx;
            font-size: 34rpx;
            font-family: "PingFangSC-Medium";
            font-weight: 650;
            border-radius: 8rpx;
            margin-top: 96rpx;
            border:none;
            height: 96rpx;
            width: 670rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .confirm::after {
            border:none;
        }
    }
}
.getCode {
    color: #fcb813;
}
.getCodeDisabled {
    color: #CCCCCC;
}
</style>
