<template>
    <div class="login">
        <goBackNav title="个人信息"></goBackNav>
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
                    <p class="title">姓名</p>
                    <input type="text" v-model="name" style="color:#5f5f5f" placeholder="请输入您的姓名" autocomplete="off" />
                </div>
                <div class="get-block" style="border:none">
                    <p class="title">手机号</p>
                    <input type="text" v-model="phone" disabled style="color:#5f5f5f" autocomplete="off" />
                </div> 
                <div class="get-block">
                    <p class="title">性别</p>
                    <!-- <input type="text" v-model="" style="color:#5f5f5f" disabled placeholder="请输入您的性别" autocomplete="off"  /> -->
                    <p @click="showg" style="color:#5f5f5f">{{gender}}</p>
                    <mp-picker ref="mpPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker>

                </div>
                <div class="get-block" style="border:none">
                    <p class="title">微信昵称</p>
                    <input type="text" v-model="wx" style="color:#5f5f5f" disabled autocomplete="off" />
                </div>
                <div>
                    <button class="confirm" @click="selfSave">保存</button>
                </div>
                <!-- <p class="title">
                    建筑业优秀班组数据库是建造工平台提供的服务，点击提交即表示同意
                    <span style="color:rgb(252 184 19)">《建造工用户协议》</span>
                </p> -->
            </form>
        </div>
    </div>
</template>

<script>
import mpPicker from 'mpvue-weui/src/picker';
import goBackNav from "@/components/goBackNav.vue";
import mpUploader from "mpvue-weui/src/uploader";
import fly from "@/services/WxApi";
export default {
    components: {
        goBackNav,
        mpUploader,
        mpPicker
    },
    data() {
        return {
            mode: 'selector',
            phone: "",
            phone_code: "",
            name: "",
            company: "",
            wx:'',
            gender:'',
            position: "",
            btnTxt: "点击获取验证码",
            disabled: false,
            time: 0, // 验证码时间初始化
            btn: true,
            pickerValueArray:[{
                label: '男',
                value: 1
                },
                {
                label: '女',
                value: 2
            }],
            pickerValueDefault: [0,0],
        };
    },
    mounted() {
        let This = this   
        This.gender = wx.getStorageSync('gender') 
        This.phone = wx.getStorageSync('mobile') 
        This.wx = wx.getStorageSync('nickName') 
        This.name = wx.getStorageSync('username') 
    },
    methods: {
        showg(){
            let This = this
            This.$refs.mpPicker.show();
        },
        onConfirm(e) {
            console.log(e)
            let This = this
            This.gender = e.label
        },
        onChange(e) {
            console.log(e);
        },
        onCancel(e) {
            console.log(e);
        },
        selfSave(){
            let This = this
            let who = ''
            if(This.gender=='男'){
                who = 1
            }else{
                who = 0
            }
            let data = {
                username:This.name,
                gender:who
            }
            fly.post('/contractor/saveMyInfo',data).then(function (res) {
                wx.setStorageSync('username', This.name)
                wx.setStorageSync('gender', This.gender)
                wx.showToast({
                    title: '修改成功',
                    icon: "none",
                    duration: 2000
                })
                wx.navigateTo({
                    url:'/pages/index/main?name=' + This.name + '&gender=' + This.gender
                });
            })
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
            border-bottom: 1rpx solid rgb(204, 204, 204);
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
            position: fixed;
            width: 670rpx;
            height: 96rpx;
            bottom: 40rpx;
            border:none;
            font-weight:550;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
.getCode {
    color: black;
}
.getCodeDisabled {
    color: rgb(204, 204, 204);
}
</style>
