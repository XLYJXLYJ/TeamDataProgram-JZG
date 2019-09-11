<template>
    <div class="register">
        <goIndex03 title="申请加入共建共享计划"></goIndex03>
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
                    <input type="text" v-model="company" :adjust-position="false" @focus="goTop" placeholder="请输入现在的公司" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="get-block">
                    <p class="title">职位</p>
                    <input type="text" v-model="position" :adjust-position="false" @focus="goTop" placeholder="请输入职位" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="img-block">
                    <p class="title" style="margin-bottom:20rpx;">在职证明（请提交三种资料之一：1.公司出具的证明函、2.工作证、3.名片）</p>
                         <div class="j-pic-upload">
                            <ul>
                                <li v-for="(src,index) in imgData" :key="src">
                                    <img @click="previewImg(index)" :src="src" class="img" >
                                    <img class="delete-icon" @click="deleI(index)" src="/static/images/delete.png">
                                </li>
                            </ul>

                            <div class="j-upload-btn" @click="uploadImg1()" :style="{'width':width || '143rpx','height':height || '143rpx'}">
                                <span class="j-upload-add">+</span>
                            </div>
                        </div>
                    <div>
                        <button class="confirm" @click="applicationSharing">提交</button>
                    </div>
                </div>
 
                <p class="title">
                    建筑业优秀班组数据库是建造工平台提供的服务，点击提交即表示同意
                    <span style="color:#fcb813;" @click="agree">《建造工用户协议》</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import {  USER_INFO } from '../../store/modules/mutation-type'
import goIndex03 from "@/components/goIndex03.vue";
import mpUploader from "mpvue-weui/src/uploader";
import fly from "@/services/WxApi";
export default {
    components: {
        goIndex03,
        mpUploader
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
            imgMessage:[],
            dataImg:[],
            url:'',
            imgData:[]
        };
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    mounted() {
        let This = this
        This.phone_code = '';


        This.imgMessage = ''
        fly.post('/contractor/getMySharingPlan').then(function (res) {
            let data = res.response
            wx.setStorageSync('joinSharePlanStatus',data.reviewStatus)
            if(data.reviewStatus==0){
                This.status='未申请'
            }
            else if(data.reviewStatus==1){
                This.status='审核通过'
            }
            else if(data.reviewStatus==2){
                This.status='审核不通过'
            }
            else{
                This.status='审核中'
            }
            This.phone=data.mobile || '—',
            This.name=data.username || '—',
            This.company=data.companyName || '—',
            This.position=data.positionName || '—';
            if(data.imgs){
                This.imgData = data.imgs.split(",") || '—'
            }

        })
        // This.url = getCurrentPages()
        // This.url = This.url[0].__displayReporter.showReferpagepath.split('.')
        // This.url = '/' +  This.url[0]
    },
    destroyed() {
        let This = this
        clearTimeout(This.Timeout)
    },
    methods: {
        chooseImg(res){
            let This = this
            This.imgData.push(res.all)
        },
        uploadImg1(){            
            let This = this
            wx.chooseImage({
                count: This.max || 6,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: function (successRes) {
                    for(let i=0;i<successRes.tempFilePaths.length;i++){
                        wx.showLoading({
                            title:'上传图片中'
                        })
                        wx.getFileSystemManager().readFile({
                            filePath: successRes.tempFilePaths[i], //选择图片返回的相对路径
                            encoding: 'base64', //编码格式
                            success:(res) =>{
                                // let img = 'data:image/png;base64,' + res.data
                                // let img1 = res.data
                                // This.dataImg.push(img1)
                                // This.uploadImg()
                                let data = {
                                    imgs:res.data
                                }
                                fly.post('/uploadImg',data).then(function (res) {
                                    This.imgData.push(res.response)
                                })
                                wx.hideLoading();
                            }
                        })
                    }
                }
            })
        },
        deleI(index){
            let This = this;
            This.imgData.splice(index,1);
            This.deleteImg(This.imgData);
        },
        deleteImg(res){
            let This = this
            This.imgData = res
        },
        previewImg(index){
            let This = this;
            let arr = []
            arr.push(This.imgData[index])
            wx.previewImage({
                current:This.imgData[index],
                urls:arr
            });
        },
        goTop(){
            wx.pageScrollTo({
                scrollTop: 200,
                duration: 200
            })
        },
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
            })
        },
        upLoadSuccess(successRes){
            let This = this
            for(let i=0;i<successRes.tempFilePaths.length;i++){
                wx.showLoading({
                    title:'上传图片中'
                })
                wx.getFileSystemManager().readFile({
                    filePath: successRes.tempFilePaths[i], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success:(res) =>{
                        // let img = 'data:image/png;base64,' + res.data
                        // let img1 = res.data
                        // This.dataImg.push(img1)
                        // This.uploadImg()
                        let data = {
                            imgs:res.data
                        }
                        fly.post('/uploadImg',data).then(function (res) {
                            This.imgMessage.push(res.response)
                            wx.hideLoading();
                        })

                    }
                })
            }
        },
        uploadImg(){
            let This = this
            let data = {
                imgs:This.dataImg.join(",")
            }
            fly.post('/uploadImg',data).then(function (res) {
                This.imgMessage = res.response.split(',')
            })
        },
        upLoadFail(errMsg){
            console.log(errMsg)
        },
        uploadDelete(DeleteRes){
            let This = this
            let index = DeleteRes.index
            This.dataImg.splice(index,1) 
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
            if(This.imgData.length==0){
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
                imgs:This.imgData.join(",")
            }
            fly.post('/contractor/applyJoinSharingPlan',data).then(function (res) {
                // wx.setStorageSync('token', res.response.authorization) 
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
                // This.test(res.response)
                wx.showToast({
                    title: "提交成功",
                    icon: "none",
                    duration: 1000
                });
                This.Timeout = setTimeout(function(){
                    wx.reLaunch({
                        url:'/pages/index/main'
                    });
                },1000)
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
            display:block;
            width: 100%;
            height: auto;
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

    .j-pic-upload{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        position: relative;
        ul{
            height: auto;
            width: auto;
            li{
                width: 144rpx;
                height: 144rpx;
                float: left;
                position: relative;
                margin-right:20rpx;
                margin-bottom: 32rpx;
                overflow: hidden;
                border-radius: 12rpx;
                .img{
                    width:144rpx;
                    border-radius: 12rpx;
                }
                .delete-icon{
                    position: absolute;
                    right: 0rpx;
                    top: 0rpx;
                    z-index: 100;
                }
            }
        }

        .j-upload-btn{
            border: 1px solid #ddd;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-radius: 12rpx;
            margin-bottom: 32rpx;
            .j-upload-add{
                font-size: 80rpx;
                font-weight: 500;
                color:#C9C9C9;
            }
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
