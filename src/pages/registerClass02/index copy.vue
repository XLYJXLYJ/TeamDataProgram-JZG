<template>
    <div class="register02">
        <goIndex02 title="推荐班组"></goIndex02>
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
                    <p class="title" style="color:black">班组负责人</p>
                    <input type="text" v-model="name" placeholder="请输入姓名" placeholder-style="color:#ccc;" autocomplete="off" />
                </div>
                <div class="get-block">
                    <p class="title" style="color:black">手机号码</p>
                    <input type="text" v-model="phone" placeholder="请输入您的手机号"  placeholder-style="color:#ccc" autocomplete="off" />
                </div>
                <div class="get-block">
                    <p class="title" style="color:black">班组类别</p>
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
                        <input
                            type="text"
                            v-model="sort"
                            placeholder="请选择班组类别"
                            autocomplete="off"
                            placeholder-style="color:#ccc"
                            @click="show"
                            disabled
                        />
                <!-- <div class="select picker" type="default"><p class="title" @click="show" :class="{'isblack':isblack}" style="font-size: 32rpx;height:55rpx;">{{sort}}</p></div> -->
                <mp-picker ref="mpPicker" :mode="mode" themeColor="#FCB813" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker>
                <!-- <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                    <div class="select picker" type="default"><p class="title">{{family}}{{sort}}</p></div>
                </picker> -->
                </div>

                <div class="get-block">
                    <p class="title" style="color:black">推荐评语</p>
                    <input type="text" v-model="recommendDesc" placeholder="推荐语将显示在班组信息展示页"  placeholder-style="color:#ccc" autocomplete="off" />
                </div>

                <!-- <div class="img-block">
                <p class="title" style="margin-bottom:20rpx;">在职证明（请提交三种资料之一：1.公司出具的证明函、2.工作证、3.名片）</p>
                <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail" @uploadDelete="uploadDelete" :showTip=false :count=1></mp-uploader>
                </div>-->
                <div>
                    <button class="confirm" @click="reClass">提交</button>
                    <!-- <button class="confirm" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码权限</button> -->
                </div>
                <p class="title" style="color:black;position:relative;top: 48rpx;">
                    成功推荐新班组，可获得更多权限与资源，详见
                    <span style="color:#fcb813;" @click="make">《建筑业优质班组共建共享计划规则》</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import goIndex02 from "@/components/goIndex02.vue";
import mpPicker from "mpvue-weui/src/picker";
import fly from "@/services/WxApi";
export default {
    components: {
        goIndex02,
        mpPicker
    },
    data() {
        return {
            Timeout:'',
            phone: "", // 手机号
            name: "", // 班组负责人名字
            sort:'', // 班组分类
            multiArray:[], // 班组数据
            multiIndex: [0,0], // 班组index
            Array:'', // 接受到的选择器总数据
            selectIndex:'', // 选中的班组位置；数组
            projectType:'', // 选中的班组ID
            mode: 'multiLinkageSelector',
            pickerValueArray:[],
            isblack:false,
            recommendDesc:'',
            url:''
        };
    },
    mounted() {
        let This = this
        This.phone = ''
        This.name = ''
        This.recommendDesc = ''
        This.sort = ''
        let oneRowArray = []
        let oneColumnArray = []
        fly.post('/contractor/getContractorType',{showAll:0}).then(function (data) {
            // This.Array = data.response
            // data.response[0].childList.map(
            //     (items,index) => oneColumnArray.push(items.name)
            // )
            // data.response.map(
            //     (items,index) => oneRowArray.push(items.name)
            // )
            // This.multiArray[0] = oneRowArray
            // This.multiArray[1] = oneColumnArray
            // This.$set(This.multiArray,This.multiArray)
            let arr = []
            data.response.map((value,index,arry)=>{
                arr.push({ 'label': value.name, 'value': value.id,'getchildren': value.childList,'children': [] })
                arr[index].getchildren.map((value1,index1,arry1) => {
                    arr[index].children.push({ 'label': value1.name, 'value': value1.id })
                })
            })
            This.pickerValueArray = arr
        })
        wx.login({    
            success: function (res) {    
                if (res.code) {    
                    //发起网络请求     
                } else {    
                    console.log('获取用户登录态失败！' + res.errMsg)    
                }    
            }    
        });
        This.url = getCurrentPages()
        This.url = This.url[0].__displayReporter.showReferpagepath.split('.')
        This.url = '/' +  This.url[0]
    },
    destroyed() {
        let This = this
        clearTimeout(This.Timeout)
    },
    methods: {
        goTop(){
            console.log('进来了')
            wx.pageScrollTo({
                scrollTop: 300,
                duration: 200,
                selector:'.get-block'
            })
        },
        show(){
            let This = this
            this.$refs.mpPicker.show();
        },
        onConfirm(e) {
            let This = this
            This.projectType = e.value[1]
            This.sort = e.label.split('-')[1]
            This.isblack = true
        },
        make(){
            wx.reLaunch({
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
            if (!This.name) {
                wx.showToast({
                    title: "请输入班组名称",
                    icon: "none",
                    duration: 2000
                })
                return;
            } 
            if (!this.phone) {
                wx.showToast({
                    title: "请输入手机号",
                    icon: "none",
                    duration: 2000
                })
                return;
            } 
            if (this.phone.length !== 11) {
                wx.showToast({
                    title: "请输入正确的手机号格式",
                    icon: "none",
                    duration: 2000
                })
                return;
            } 
            if (!This.projectType) {
                wx.showToast({
                    title: "请选择班组类别",
                    icon: "none",
                    duration: 2000
                })
                return;
            } 

            let data = {
                username:This.name,
                mobile:This.phone,
                contractorType:This.projectType,
                recommendDesc:This.recommendDesc
            }
            fly.post('/contractor/recommendContractor',data).then(function (res) {
                wx.showToast({
                    title: res.message,
                    icon: "none",
                    duration: 1000
                })
                if(res.message == '成功'){
                This.Timeout = setTimeout(function(){
                     wx.reLaunch({
                        url:'/pages/RecommendedTeams/main'
                    });
                },1000)
     
                }
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
.register02 {
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
                height: 60rpx;
            }
        }
        .img-block {
            width: 100%;
            height: 330rpx;
        }
        .title {
            font-size: 28rpx;
            color: #ccc;
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
            font-weight: 650;
            position: relative;
            top: 48rpx;
            color:black;
        }
        .confirm::after{
            border:none;
        }
    }
}
.getCode {
    color: black;
}
.getCodeDisabled {
    color: #CCCCCC;
}
.isblack{
    color: black!important;
}

</style>
