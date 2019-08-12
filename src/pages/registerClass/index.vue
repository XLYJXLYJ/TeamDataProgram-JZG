<template>
    <div class="register">
        <goBackNav title="推荐班组"></goBackNav>
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
                    <p class="title">班组负责人</p>
                    <input type="text" v-model="name" placeholder="请输入姓名" autocomplete="off" />
                </div>

                <div class="get-block">
                    <p class="title">手机号码</p>
                    <input type="text" v-model="phone" placeholder="请输入您的手机号" autocomplete="off" />
                </div>

                <div class="get-block">
                    <p class="title">班组类别</p>


                    <!-- <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                        <input
                            class="picker"
                            type="text"
                            v-model="ClassClassification"
                            placeholder="请输入现在的公司"
                            autocomplete="off"
                            @focus="showMulLinkageTwoPicker"
                        />
                    </picker> -->

                <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                    <div class="select picker" type="default"><p class="title">{{family}}{{sort}}</p></div>
                </picker>



                </div>



                <!-- <div class="img-block">
                <p class="title" style="margin-bottom:20rpx;">在职证明（请提交三种资料之一：1.公司出具的证明函、2.工作证、3.名片）</p>
                <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail" @uploadDelete="uploadDelete" :showTip=false :count=1></mp-uploader>
                </div>-->
                <div>
                    <button class="confirm" @click="reClass">提交</button>
                    <!-- <button class="confirm" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码权限</button> -->
                </div>
                <p class="title">
                    成功推荐新班组，可获得更多权限与资源，详见
                    <span style="color:rgb(252 184 19)" @click="make">《建筑业优质班组共建共享计划规则》</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
import mpPicker from "mpvue-weui/src/picker";
import fly from "@/services/WxApi";
export default {
    components: {
        goBackNav,
        mpPicker
    },

    data() {
        return {
            phone: "", // 手机号
            name: "", // 班组负责人名字
            family: "班组", // 班组分类
            sort:'分类', // 班组分类
            multiArray:[], // 班组数据
            multiIndex: [0,0], // 班组index
            Array:'', // 接受到的选择器总数据
            selectIndex:'', // 选中的班组位置；数组
            projectType:'' // 选中的班组ID
        };
    },
    mounted() {
        let This = this
        let oneRowArray = []
        let oneColumnArray = []
        fly.get('/contractor/getContractorType').then(function (data) {
            This.Array = data.response
            console.log(This.Array)
            data.response[0].childList.map(
                (items,index) => oneColumnArray.push(items.name)
            )
            data.response.map(
                (items,index) => oneRowArray.push(items.name)
            )
            This.multiArray[0] = oneRowArray
            This.multiArray[1] = oneColumnArray
            This.$set(This.multiArray,This.multiArray)
        })

        wx.login({    
            success: function (res) {    
                if (res.code) {    
                    //发起网络请求    
                     console.log('获取用户登录态成功！')    
                    console.log(res.code)    
                } else {    
                    console.log('获取用户登录态失败！' + res.errMsg)    
                }    
            }    
        });
    },
    methods: {
        make(){
            wx.navigateTo({
                url:'/pages/commonMake/main'
            });
        },
        bindMultiPickerChange: function (e) {
            let This = this
            This.selectIndex = e.mp.detail.value
            let one = This.selectIndex[0]
            let two = This.selectIndex[1]
            This.projectType = this.Array[one].childList[two].projectType
            This.family = this.Array[one].name
            This.sort = this.Array[one].childList[two].name
        },
        getPhoneNumber (e) {
            console.log(e)
        },
        reClass(index){
            let This = this
            let data = {
                username:This.name,
                mobile:This.phone,
                projectType:This.projectType,
            }
            fly.post('/contractor/recommendContractor',data).then(function (data) {
                console.log(data)
                wx.navigateTo({
                    url:'/pages/index/main'
                });
            })
        },
        bindMultiPickerColumnChange: function (e) {
            let oneColumnArray = [];
            let oneRowArray = [];
            let This = this
            This.Array.map(
                (items,index) => oneRowArray.push(items.name)
            )
            if(e.mp.detail.column==0){
                for(let i=0;i<20;i++){
                    if(i==e.mp.detail.value){
                        This.Array[i].childList.map((items,index) => oneColumnArray.push(items.name))
                        This.multiArray[0] = oneRowArray
                        This.multiArray[1] = oneColumnArray
                        This.multiIndex = [i,0]
                        This.$set(This.multiArray,This.multiArray)
                    }
                }
            }
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
            color: block;
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
