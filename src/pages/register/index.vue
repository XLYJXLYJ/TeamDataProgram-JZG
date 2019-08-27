<template>
    <div class="register">
        <goIndex title="申请加入共建共享计划"></goIndex>
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
                <!-- 第一个表单 -->
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
                        <!-- <p @click="GetClassCode" :class="{getCode:btn, getCodeDisabled:!btn}">{{btnTxt}}</p> -->
                       <p @click="GetClassCode" :disabled='btn' :class="{getCode:btn, getCodeDisabled:!btn}">{{btnTxt}}</p>
                    </div>
                </div>
                <div class="get-block">
                    <p class="title">姓名</p>
                    <input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="get-block">
                    <p class="title">所在公司</p>
                    <input type="text" v-model="company" placeholder="请输入现在的公司" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="get-block">
                    <p class="title">职位</p>
                    <input type="text" v-model="position" placeholder="请输入职位" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="img-block">
                    <p class="title" style="margin-bottom:20rpx;">在职证明（请提交三种资料之一：1.公司出具的证明函、2.工作证、3.名片）</p>
                    <mp-uploader
                        @upLoadSuccess="upLoadSuccess"
                        @upLoadFail="upLoadFail"
                        @uploadDelete="uploadDelete"
                        ref="uploader"
                        :showTip=false
                        :maxLength=1
                        :isMaxHiddenChoose=true
                    ></mp-uploader>
                </div>
                <div>
                    <button class="confirm" @click="applicationSharing">提交</button>
                </div>
                <p class="title">
                    建筑业优秀班组数据库是建造工平台提供的服务，点击提交即表示同意
                    <span style="color:rgb(252 184 19)" @click="agree">《建造工用户协议》</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import {  USER_INFO } from '../../store/modules/mutation-type'
import goIndex from "@/components/goIndex.vue";
import mpUploader from "mpvue-weui/src/uploader";
import fly from "@/services/WxApi";
export default {
    components: {
        goIndex,
        mpUploader
    },
    data() {
        return {
            phone: "",
            phone_code: "",
            name: "",
            company: "",
            position: "",
            btnTxt: "获取验证码",
            disabled: false,
            time: 0, // 验证码时间初始化
            btn: true,
            imgMessage:[],
            dataImg:'',
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
        This.phone = '';
        This.phone_code = '';
        This.name = '';
        This.company = '';
        This.position = ''

        This.url = getCurrentPages()
        console.log(This.url)
        This.url = This.url[0].__displayReporter.showReferpagepath.split('.')
        This.url = '/' +  This.url[0]
        console.log(This.url)
    },
    methods: {
        ...mapMutations([
            USER_INFO
        ]),
        test(data1){
            let This = this
            This[USER_INFO](data1)
        },
        GetClassCode() {
            if (!this.phone) {
                wx.showToast({
                    title: "请输入手机号",
                    icon: "none",
                    duration: 2000
                });
            } else if (this.phone.length !== 11) {
                wx.showToast({
                    title: "请输入正确手机号格式",
                    icon: "none",
                    duration: 2000
                });
            } else {
                if (this.time == 0) {
                    this.time = 60;
                    this.Timer();
                    this.sendClass()
                } else {
                    console.log("不能重复发送验证码");
                }
            }
        },
        // 验证60s
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
        sendClass(){
            let This = this
            let data = {
                mobile:This.phone
            }
            fly.post('/contractor/getVerificationCode',data).then(function (res) {
                console.log(res)
            })
        },
        upLoadSuccess(successRes){
            let This = this
            wx.showLoading({
                title:'上传图片中'
            })
            for(let i=0;i<successRes.tempFilePaths.length;i++){
                wx.getFileSystemManager().readFile({
                    filePath: successRes.tempFilePaths[i], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success:(res) =>{
                        // let img = 'data:image/png;base64,' + res.data
                        let img1 = res.data
                        This.dataImg = {
                            imgs:img1
                        }
                        This.uploadImg()
                    }
                })
            }
            wx.hideLoading();
        },
        uploadImg(){
            let This = this
            console.log('上传图片咯')
            fly.post('/uploadImg',This.dataImg).then(function (res) {
                This.imgMessage.push(res.response)
            })
        },

        upLoadFail(errMsg){
            console.log(errMsg)
        },
        uploadDelete(DeleteRes){
            let This = this
            let index = DeleteRes.index
            This.imgMessage.splice(index,1)      
        },
        agree(){
            wx.reLaunch({
                url:'/pages/userAgreement/main'
            });
        },
        applicationSharing(){
            let This = this
            if(!This.phone){
                wx.showToast({
                    title: "手机号不能为空",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            if (this.phone.length !== 11) {
                wx.showToast({
                    title: "请输入正确手机号格式",
                    icon: "none",
                    duration: 2000
                });
                return;
            } 
            if(!This.phone_code){
                wx.showToast({
                    title: "验证码不能为空",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            if(!This.name){
                wx.showToast({
                    title: "姓名不能为空",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            if(!This.company){
                wx.showToast({
                    title: "公司名不能为空",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            if(!This.position){
                wx.showToast({
                    title: "职位不能为空",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            if(This.imgMessage.length==0){
                wx.showToast({
                    title: "请上传在职证明",
                    icon: "none",
                    duration: 2000
                });
                return;
            }
            let data = {
                mobile:This.phone,
                vaCode:This.phone_code,
                username:This.name,
                companyName:This.company,
                positionName:This.position,
                imgs:This.imgMessage.join(",")
            }
            fly.post('/contractor/applyJoinSharingPlan',data).then(function (res) {
                wx.setStorageSync('token', res.response.authorization) 
                if(res.response.gender == 1 ){
                    wx.setStorageSync('gender', '男') 
                }else{
                    wx.setStorageSync('gender', '女') 
                }
                wx.setStorageSync('mobile', res.response.mobile) 
                wx.setStorageSync('nickName', res.response.nickName) 
                wx.setStorageSync('username', res.response.username) 
                wx.setStorageSync('img',res.response.headImg)
                // wx.setStorageSync('username', res.response.username) 
                This.test(res.response)
                wx.showToast({
                    title: "提交成功",
                    icon: "none",
                    duration: 2000
                });
                wx.reLaunch({
                    url:'/pages/index/main'
                });
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.register {
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
            border:none;
            height: 96rpx;
            width: 670rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 650!important;
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
    color: #e5e5e5;
}

</style>
