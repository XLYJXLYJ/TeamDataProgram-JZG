<template>
    <div class="card-contain">
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

            <div class="fixedSelectCity" v-if="isTop" ref="selectCityDom" :style="{top: navBarHeight + 'px'}">
                <div>
                    <!-- <picker mode="multiSelector" @change="cityMultiPickerChange" @columnchange="cityMultiPickerColumnChange" :value="cityMultiIndex" :range="cityMultiArray">
                        <div class="city">{{city}}<img style="width:20.2rpx;height:16rpx;margin-left:6rpx;" src="/static/images/bottom.png" alt=""></div>
                    </picker>  -->
                    <div class="city"  @click="showCity">{{city}}<img style="width:20.2rpx;height:16rpx;margin-left:6rpx;position:relative;top:-5rpx!important;" src="/static/images/bottom.png" alt=""></div>
                    <mp-picker ref="cityPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="cityPickerValueDefault" @onChange="onCityChange" @onConfirm="onCityConfirm" @onCityCancel="onCancel" :pickerValueArray="pickerCityValueArray"></mp-picker>
                </div>
                <span style="color:rgb(204,204,204)">|</span>
                <div>
                    <!-- <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                        <div class="select picker" type="default">{{sort}} <img style="width:20.2rpx;height:16rpx;" src="/static/images/bottom.png" alt=""></div>
                    </picker>  -->
                    <div class="select picker" type="default" @click="show">{{sort}} <img style="width:20.2rpx;height:16rpx;position:relative;top:-5rpx!important;" src="/static/images/bottom.png" alt=""></div>
                    <mp-picker ref="mpPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker>
                </div>
            </div>



            <div style="height:66rpx">
                <div class="selectCity" v-if="!isTop" :style="{top: navBarHeight + 'px'}">
                    <div v-if="!isTop">
                        <!-- <picker mode="multiSelector" @change="cityMultiPickerChange" @columnchange="cityMultiPickerColumnChange" :value="cityMultiIndex" :range="cityMultiArray">
                            <div class="city">{{city}}<img style="width:20.2rpx;height:16rpx;margin-left:6rpx;" src="/static/images/bottom.png" alt=""></div>
                        </picker>  -->
                        <div class="city"  @click="showCity">{{city}}<img style="width:20.2rpx;height:16rpx;margin-top:-16rpx!important" src="/static/images/bottom.png" alt=""></div>
                        <mp-picker ref="cityPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="cityPickerValueDefault" @onChange="onCityChange" @onConfirm="onCityConfirm" @onCityCancel="onCancel" :pickerValueArray="pickerCityValueArray"></mp-picker>
                    </div>
                    <span v-if="!isTop" style="color:rgb(204,204,204)">|</span>
                    <div v-if="!isTop">
                        <!-- <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                            <div class="select picker" type="default">{{sort}} <img style="width:20.2rpx;height:16rpx;" src="/static/images/bottom.png" alt=""></div>
                        </picker>  -->
                        <div class="select picker" type="default" @click="show">{{sort}} <img style="width:20.2rpx;height:16rpx;margin-top:-16rpx!important" src="/static/images/bottom.png" alt=""></div>
                        <mp-picker ref="mpPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker>
                    </div>
                </div>
            </div>

        <ul class="card-ul">
            <div class="img-contain" v-if="list.length == 0">
                <img src="/static/images/none.png">
            </div>
            <div v-if="list.length != 0">
                <li class="card-li" @click="goIntro(item.id)" v-for="(item,index) in list" :key="index">
                    <div class="left">
                        <div class="img">
                            <img :src="item.compressUrl" alt="" v-if="item.compressUrl">
                            <img src="/static/images/user1.png" alt="" v-if="!item.compressUrl">
                        </div>
                        <div class="text-detail">
                            <div class="company">{{item.organizationName}}</div>
                            <div>
                                <ul class="text-ul">
                                    <li class="text-li" v-for="(twoItem,twoIndex) in item.contractorProjectTypes" :key="twoIndex">
                                        <div v-if="twoItem.medalNum" style="padding:0rpx 10rpx 0rpx 10rpx">
                                            {{twoItem.projectTypeName}} 
                                            <img src="/static/images/star.png" alt="">
                                            {{twoItem.medalNum}}
                                        </div>
                                        <div v-if="!twoItem.medalNum" style="font-size:28rpx;margin-bottom:4rpx;background-color:#fff;color:#000">
                                            {{twoItem.projectTypeName}} 
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="achievement" v-if='!item.projectPerformanceCount'>暂未上传工程业绩</div>
                            <div class="achievement" v-if='item.projectPerformanceCount'>{{item.projectPerformanceCount}} 项工程业绩</div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="/static/images/right.png" alt="">
                    </div>
                </li>
            </div>
        </ul>
        <!-- <ul class="card-ul">
            <div class="img-contain" v-if="!list">
                <img src="/static/images/none.png">
            </div>
            <div v-if="list">
                <li class="card-li" @click="goIntro(item.id)" v-for="(item,index) in list" :key="index">
                    <button style="border:none;" open-type="getUserInfo" @getuserinfo="getUserInfo">
                        <img class="img" src="/static/images/user.png" alt="" v-if="!item.compressUrl">
                        <img :src="item.compressUrl" alt="" v-if="item.compressUrl">
                        <div class="company">{{item.organizationName}}</div>
                        <ul class="text-ul">
                            <li class="text-li" v-for="(twoItem,twoIndex) in item.contractorProjectTypes" :key="twoIndex">
                                <span>{{twoItem.projectTypeName}}</span> 
                                &nbsp;<span class="img-star"></span>&nbsp;
                                <span>{{twoItem.medalNum}}</span> 
                            </li>
                        </ul>
                        <div class="achievement">{{item.projectPerformanceCount}} 项工程业绩</div>
                        <img class="right" src="/static/images/right.png" alt="">
                    </button>
                </li>
            </div>
        </ul> -->
        <div style="height:120rpx" v-show="!showButton || joinSharePlanStatus==1">

        </div>
         <button class="shareButton" @click="goPoint" v-show="showButton && joinSharePlanStatus!=1">加入共建共享计划，查看更多班组</button>
    </div>
</template>

<script>
import mpPicker from 'mpvue-weui/src/picker';
import fly from "@/services/WxApi";
import alertOk from "@/components/alertOk.vue";
export default {
    components: {
        mpPicker,
        alertOk
    },
    data() {
        return {
            joinSharePlanStatus:'',
            changeModel:false,
            isModel:false,
            path:'',
            mode: 'multiLinkageSelector',
            isTop:false,
            statusBarHeight: "", // 状态栏高度
            titleBarHeight: "", // 标题栏高度
            navBarHeight: "", // 导航栏总高度
            multiArray:[],
            multiIndex: [0,0],
            Array:'', // 接受到的选择器总数据
            selectIndex:'', // 选中的班组index位置
            family: "班组", // 班组分类
            sort:'班组分类', // 班组分类
            projectType:'', // 班组id
            page:1,
            cityMultiArray:[],
            cityMultiIndex: [0,0],
            cityArray:'', // 接受到的选择器总数据
            citySelectIndex:'', // 选中的班组index位置
            city: "广东省", // 班组分类
            cityId:'', // 城市id
            pickerValueArray:[],
            pickerCityValueArray:[],
            showButton:false,
            list:[],
            isNull:'1'
        };
    },
    onPageScroll: function(res) {
        let This = this
        if (res.scrollTop > 140) {
            This.isTop = true
        } else {
            This.isTop = false
        }
    },
    onPullDownRefresh:function(){
        console.log("刷新"); 
    },
    onReachBottom () {
        let This = this
        This.page = This.page + 1
        This.getClass()
    },
    beforeMount() {
        const self = this;
        wx.getSystemInfo({
            success(system) {
                self.statusBarHeight = system.statusBarHeight;
                self.platform = system.platform;
                self.model = system.model;
                self.brand = system.brand;
                self.system = system.system;
                let platformReg = /ios/i;
                if (platformReg.test(system.platform)) {
                    self.titleBarHeight = 38;
                } else {
                    self.titleBarHeight = 43;
                }
                self.navBarHeight = self.statusBarHeight + self.titleBarHeight;
            }
        });
    },
    onShow(){
        let This = this
        This.isTop = false
    },
    onUnload(){
        let This = this
        This.isTop = false
    },
    created() {
        let This = this
        This.joinSharePlanStatus = wx.getStorageSync('joinSharePlanStatus')
        fly.get('/contractor/getProvinceCityDropDown').then(function (data) {
            // let oneRowArray = []
            // let oneColumnArray = []
            // This.cityArray = data.response
            // data.response[0].childList.map(
            //     (items,index) => oneColumnArray.push(items.name)
            // )
            // data.response.map(
            //     (items,index) => oneRowArray.push(items.name)
            // )
            // This.cityMultiArray[0] = oneRowArray
            // This.cityMultiArray[1] = oneColumnArray
            // This.$set(This.cityMultiArray,This.cityMultiArray)
            This.cityId = data.response[0].childList[0].id
            let arr = []
            data.response.map((value,index,arry)=>{
                arr.push({ 'label': value.name, 'value': value.id,'getchildren': value.childList,'children': [] })
                arr[index].getchildren.map((value1,index1,arry1) => {
                    arr[index].children.push({ 'label': value1.name, 'value': value1.id })
                })
            })
            This.pickerCityValueArray = arr
            This.getClass()
        })
        fly.post('/contractor/getContractorType',{showAll:1}).then(function (data) {
            // 用于原声小程序picker
            // let oneRowArray = []
            // let oneColumnArray = []
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
            // arr.map((value,index,arry)=>{
            //     arr.children.map((value,index,arry)=>{
            //         // arr[index].children.push({ 'label': value.name, 'value': value.id})
            //     })
            // })
        })

    },
    methods: {
        closeAlert(){
            let This = this
            This.changeModel = false
            This.isModel = false 
        },
        goIntro(index){
            let This = this
            if(!wx.getStorageSync('token')){
                This.changeModel = true
                This.isModel = true
                This.path = '/pages/introdution/main?contractorId=' + index
            }else{
                wx.navigateTo({
                    url:'/pages/introdution/main?contractorId=' + index
                })
            }
        },
        bindMultiPickerChange: function (e) {
            let This = this
            This.selectIndex = e.mp.detail.value
            let one = This.selectIndex[0]
            let two = This.selectIndex[1]
            This.projectType = this.Array[one].childList[two].projectType
            This.family = this.Array[one].name
            This.sort = this.Array[one].childList[two].name
            This.getClass()
        },
        getClass(){
            let This = this
            if(This.isNull == null || This.isNull.length == 0){
                wx.showToast({
                    title: '数据已加载完',
                    icon: "none",
                    duration: 2000
                })
            }else{
                wx.showLoading({
                    title:'加载中'
                })
            }
            This.joinSharePlanStatus = wx.getStorageSync('joinSharePlanStatus')
            let data = {
                page:This.page,
                pageSize:10,
                projectType:This.projectType,
                area:This.cityId || ''
            }
            fly.post('/contractor/getHQContractorList',data).then(function (res) {
                wx.hideLoading();
                if(res.message == '您的登录已失效,请重新登录'){
                    wx.clearStorage()
                    This.getClass()
                    return;
                }
                if(This.page == 1){
                   This.list = res.response.list
                    if(res.response.list == null || res.response.list.length<5){
                        This.showButton = true
                   }else{
                        This.showButton = false
                   }
                }else{
                //    This.list.push(JSON.parse(JSON.stringify([res.response.list])))
                   if(res.response.list == null || res.response.list.length == 0){
                        This.showButton = true
                   }else{
                        This.showButton = false
                   }
                   This.isNull = res.response.list
                //    This.list = This.list.concat(res.response.list)
                  This.list.push(...res.response.list)
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
                for(let i=0;i<40;i++){
                    if(i==e.mp.detail.value){
                        This.Array[i].childList.map((items,index) => oneColumnArray.push(items.name))
                        This.multiArray[0] = oneRowArray
                        This.multiArray[1] = oneColumnArray
                        This.multiIndex = [i,0]
                        This.$set(This.multiArray,This.multiArray)
                    }
                }
            }
        },
        cityMultiPickerChange: function (e) {
            let This = this
            This.citySelectIndex = e.mp.detail.value
            let one = This.citySelectIndex[0]
            let two = This.citySelectIndex[1]
            This.cityId = This.cityArray[one].childList[two].id
            This.city = This.cityArray[one].childList[two].name
            This.getClass()
        },
        cityMultiPickerColumnChange: function (e) {
            let oneColumnArray = [];
            let oneRowArray = [];
            let This = this
            This.cityArray.map(
                (items,index) => oneRowArray.push(items.name)
            )
            if(e.mp.detail.column==0){
                for(let i=0;i<20;i++){
                    if(i==e.mp.detail.value){
                        This.cityArray[i].childList.map((items,index) => oneColumnArray.push(items.name))
                        This.cityMultiArray[0] = oneRowArray
                        This.cityMultiArray[1] = oneColumnArray
                        This.cityMultiIndex = [i,0]
                        This.$set(This.cityMultiArray,This.cityMultiArray)
                    }
                }
            }
        },
        goPoint(){
            let This = this
            if(!wx.getStorageSync('token')){
                This.changeModel = true
                This.isModel = true
                This.path = '/pages/register/main'
            }else{
                if(This.joinSharePlanStatus == 0){
                    wx.redirectTo({
                        url:'/pages/register/main'
                    })
                }else{
                    wx.reLaunch({
                        url:'/pages/sharing/main'
                    })
                }
            }

        },
        show(){
            let This = this
            this.$refs.mpPicker.show();
        },
        onConfirm(e) {
            let This = this
            This.projectType = e.value[1]
            let arr = e.label.split('-')
            This.sort = arr[1]
            This.page = 1
            This.getClass()
        },
        onChange(e) {
            console.log(e);
        },
        onCancel(e) {
            console.log(e);
        },

        showCity(){
            let This = this
            This.$refs.cityPicker.show();
        },
        onCityConfirm(e) {
            let This = this
            This.cityId = e.value[1]
            This.city = e.label
            let arr = This.city.split('-')
            This.city = arr[1] 
            This.$emit('city',This.city)
            This.page = 1
            This.page = 1
        },
        onCityChange(e) {
            console.log(e);
        },
        onCityCancel(e) {
            console.log(e);
        },
        hidePanel: function(event) {
            //这句是说如果我们点击到了id为myPanel以外的区域
            let This = this
            This.changeModel = false
            This.isModel = false
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
                            // wx.reLaunch({
                            //     url:This.path
                            // });
                            This.changeModel = false
                            This.isModel = false
                        })
                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        }
    },
    props: ["text"]
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
        position: absolute;
        bottom: 0rpx;
    }
    button {
        width: 100%;
        height: 96rpx;
        font-size: 34rpx;
        color: rgb(252, 184, 19);
        font-family: "PingFangSC-Medium";
        font-weight: 650;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        border-bottom: none;
        border-top: 1px solid #e5e5e5;

    }
    button::after {
        border: none;
    }
}
.card-contain {
    width: 100%;
    height: 100%;
    .selectCity{
        width: 670rpx;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        height: 66rpx;
        border-bottom: 1rpx solid #e5e5e5;
        font-weight: 550;
        animation:moveIn1 1s infinite;
        animation-iteration-count:1;
        @keyframes moveIn1
        {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes moveOut1
        {
            100% {
                opacity: 1;
            }
            0% {
                opacity: 0;
            }
        }
        img{
            width:20.2rpx;
            height:16rpx;
            position: relative;
            top: -4rpx;
        }
    }
    .fixedSelectCity{
        width: 100%;
        position: fixed;
        top: 100rpx;
        left: 0rpx;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 66rpx;
        background: white;
        border-bottom: 1rpx solid #e5e5e5;
        font-weight: 550;
        z-index: 999;
        animation:moveIn .5s infinite;
        animation-iteration-count:1;
        @keyframes moveIn
            {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        @keyframes moveOut
            {
                100% {
                    opacity: 1;
                }
                0% {
                    opacity: 0;
                }
            }
    }
    // .card-ul{
    //     width: 670rpx;
    //     height: auto;
    //     margin: 0 auto;
    //     .img-contain{
    //         width: 100%;
    //         height: 660rpx;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         img{
    //             width: 128rpx;
    //             height: 134rpx;
    //         }
    //     }
    //    .card-li{
    //         height: 190rpx;
    //         width: 670rpx;
    //         position: relative;
    //         border-bottom: 1px solid #ccc;
    //         button::after{
    //             border: none;
    //         }
    //         button{
    //             height: 190rpx;
    //             width: 670rpx;
    //             background: #fff;
    //             z-index: 0;
    //             position: relative;
    //             img{
    //                 width: 128rpx;
    //                 height: 134rpx;
    //                 position: absolute;
    //                 left: 0rpx;
    //                 top: 28rpx;
    //             }
    //             .company{
    //                 font-family: 'PingFangSC-Regular';
    //                 font-size: 34rpx;
    //                 color: black;
    //                 font-weight: 550;
    //                 display: flex;
    //                 justify-content: flex-start;
    //                 position: absolute;
    //                 left: 146rpx;
    //                 top: 0rpx;
    //             }    
    //             .text-ul{
    //                 list-style: none;
    //                 position: absolute;
    //                 left: 146rpx;
    //                 top: 74rpx;
    //                 .text-li{
    //                     float: left;
    //                     height: 40rpx;
    //                     width: auto;
    //                     background-color: rgba(252, 184, 19,.2);
    //                     font-family: 'PingFangSC-Regular';
    //                     font-size: 24rpx;
    //                     color: rgb(202, 146, 9);
    //                     display: flex;
    //                     align-items: center;
    //                     justify-content: space-around;
    //                     margin-right: 10rpx;
    //                     padding: 0rpx 10rpx 0 10rpx;
    //                     .img-star{
    //                         background-image: url('/static/images/star.png') no-repeat;
    //                         background-size: 16rpx 16rpx;
    //                     }
    //                 }
    //             }
    //             .achievement{
    //                 font-family: 'PingFangSC-PingFangSC-Light';
    //                 font-size: 28rpx;
    //                 position: absolute;
    //                 left: 146rpx;
    //                 top: 104rpx;
    //             }
    //             .right{
    //                 width: 16rpx;
    //                 height: 25.2rpx;
    //                 position: absolute;
    //                 left: 626rpx;
    //                 top: 90rpx;
    //             }
    //         }
    //     }
    // }
.card-ul{
        width: 670rpx;
        height: auto;
        margin: 0 auto;
        .img-contain{
            width: 100%;
            height: 660rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 128rpx;
                height: 134rpx;
            }
        }
        .card-li{
            height: 190rpx;
            width: 670rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e5e5e5;
            .left{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                img{
                    width: 126rpx;
                    height: 126rpx;
                    border-radius: 8rpx;
                    margin-top: 14rpx;
                }
                .text-detail{
                    font-family: 'PingFangSC-Regular';
                    font-size: 34rpx;
                    margin-left:20rpx;
                    height: auto;
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: column;
                    .company{
                        font-family: 'PingFangSC-Regular';
                        width: 480rpx;
                        height: 58rpx;
                        overflow: hidden;
                        font-size: 34rpx;
                        color: black;
                        font-weight: 550;
                    }
                    .text-ul{
                        list-style: none;
                        width: 480rpx;
                        height: 46rpx;
                        overflow: hidden;
                        .text-li{
                            height: 40rpx;
                            width: auto;
                            background-color: rgba(252, 184, 19,.2);
                            font-family: 'PingFangSC-Regular';
                            font-size: 24rpx;
                            color: rgb(202, 146, 9);
                            display: flex;
                            justify-content: space-around;
                            flex-direction: column;
                            align-items: center;
                            margin-right: 10rpx;
                            margin-bottom: 8rpx;
                            float: left;
                            overflow: hidden;
                            img{
                                width: 16rpx;
                                height: 16rpx;
                                margin-left: 4rpx;
                                margin-right: 4rpx;
                            }
                        }
                    }
                    .achievement{
                        font-family: 'PingFangSC-PingFangSC-Light';
                        font-size: 28rpx;
                    }
                }
            }
            .right{
                width: 16rpx;
                height: 25rpx;
                margin-top: -27rpx;
                img{
                    width: 16rpx;
                    height: 25.2rpx;
                }
            }
        }
    }
    .shareButton{
        width: 670rpx;
        height: 96rpx;
        font-family: 'PingFangSC-Medium';
        font-size: 34rpx;
        margin-top: 64rpx;
        margin-bottom: 206rpx;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background:rgb(252, 184, 19);
        color: black;
        font-weight: 650;
        border: none;
    }
    .shareButton::after{ border: none; }
}
</style>
