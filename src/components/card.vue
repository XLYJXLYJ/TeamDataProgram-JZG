<template>
    <div class="card-contain">
        <div :class="{'fixedSelectCity':isTop,'selectCity':!isTop}" ref="selectCityDom" :style="{top: navBarHeight + 'px'}">
            <div>
                <picker mode="multiSelector" @change="cityMultiPickerChange" @columnchange="cityMultiPickerColumnChange" :value="cityMultiIndex" :range="cityMultiArray">
                    <div class="city">{{city}}<img style="width:20.2rpx;height:16rpx;margin-left:6rpx;" src="/static/images/bottom.png" alt=""></div>
                </picker> 
            
            </div>


            <span style="color:rgb(204,204,204)">|</span>
            <div>
                <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                    <div class="select picker" type="default">{{family}}{{sort}} <img style="width:20.2rpx;height:16rpx;" src="/static/images/bottom.png" alt=""></div>
                </picker> 
                <!-- <mp-picker ref="mpPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker> -->
                <!-- <mp-picker ref="mpPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker> -->
                <!-- <span><img style="width:20.2rpx;height:12rpx;" src="/static/images/mask.png"> </span> -->
            </div>
        </div>
        <!-- <picker
            mode="multiSelector"
            @change="bindCityChange"
            @columnchange="bindCityColumnChange"
            :value="multiIndex"
            :range="multiArray"
            range-key="name"
        >
            <view class="picker">选择城市sdsdsd</view>
        </picker> -->
        <ul class="card-ul">
            <li class="card-li" @click="goIntro" v-for="(item,index) in list" :key="index">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">{{item.organizationName}}</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li" v-for="(twoItem,twoIndex) in ContractorProjectType" :key="twoIndex">{{twoItem.projectTypeName}} * {{twoItem.medalNum}}</li>
                            </ul>
                        </div>
                        <div class="achievement">{{item.projectPerformanceCount}} 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
        </ul>
        <button class="shareButton">加入共建共享计划，查看更多班组</button>
    </div>
</template>

<script>
import mpPicker from 'mpvue-weui/src/picker';
import fly from "@/services/WxApi";
export default {
    components: {
        mpPicker,
    },
    data() {
        return {
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
            sort:'分类', // 班组分类
            projectType:'', // 班组id

            cityMultiArray:[],
            cityMultiIndex: [0,0],
            cityArray:'', // 接受到的选择器总数据
            citySelectIndex:'', // 选中的班组index位置
            city: "城市", // 班组分类
            cityId:'', // 城市id

            list:''
        };
    },
    onPageScroll: function(res) {
        let This = this
        if (res.scrollTop > 190) {
            This.isTop = true
        } else {
            This.isTop = false
        }
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
                    self.titleBarHeight = 39;
                } else {
                    self.titleBarHeight = 43;
                }
                self.navBarHeight = self.statusBarHeight + self.titleBarHeight;
            }
        });
    },
    mounted() {
        let This = this

        fly.get('/contractor/getProvinceCityDropDown').then(function (data) {
            let oneRowArray = []
            let oneColumnArray = []
            This.cityArray = data.response
            data.response[0].childList.map(
                (items,index) => oneColumnArray.push(items.name)
            )
            data.response.map(
                (items,index) => oneRowArray.push(items.name)
            )
            This.cityMultiArray[0] = oneRowArray
            This.cityMultiArray[1] = oneColumnArray
            This.$set(This.cityMultiArray,This.cityMultiArray)
        })

        fly.get('/contractor/getContractorType').then(function (data) {
            let oneRowArray = []
            let oneColumnArray = []
            This.Array = data.response
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
    },
    methods: {
        goIntro(){
            wx.redirectTo({
                url: '../introdution/main'
            })
        },
        bindMultiPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为', e)
            let This = this
            This.selectIndex = e.mp.detail.value
            let one = This.selectIndex[0]
            let two = This.selectIndex[1]
            This.projectType = this.Array[one].childList[two].projectType
            This.family = this.Array[one].name
            This.sort = this.Array[one].childList[two].name
            this.getClass()
        },
        getClass(){
            let This = this
            let data = {
                page:1,
                pageSize:5,
                projectType:This.projectType,
                area:This.cityId || ''
            }
            fly.post('/contractor/getHQContractorList',data).then(function (res) {
                console.log(res)
                This.list = res.response.list
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
            console.log('picker发送选择改变，携带值为', e)
            let This = this
            This.citySelectIndex = e.mp.detail.value
            let one = This.citySelectIndex[0]
            let two = This.citySelectIndex[1]
            This.cityId = this.cityArray[one].childList[two].id
            This.city = this.cityArray[one].childList[two].name
            this.getCity()
        },
        getCity(){
            let This = this
            let data = {
                page:1,
                pageSize:5,
                projectType:This.projectType || '',
                area:This.cityId
            }
            fly.post('/contractor/getHQContractorList',data).then(function (res) {
                console.log(res)
                This.list = res.response.list
            })
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
        }

    },
    props: ["text"]
};
</script>

<style lang="scss" scoped>
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
        padding-top:60rpx;
        border-bottom: 1px solid rgb(204, 204, 204);
    }
    .fixedSelectCity{
        width: 672rpx;
        position: fixed;
        top: 100rpx;
        left: 40rpx;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 66rpx;
        background: white;
    }
    .card-ul{
        width: 670rpx;
        height: auto;
        margin: 0 auto;
        .card-li{
            height: 190rpx;
            width: 670rpx;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgb(204, 204, 204);
            .left{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                margin-top: 2rpx;
                img{
                    width: 126rpx;
                    height: 126rpx;
                }
                .text-detail{
                    font-family: 'PingFangSC-Regular';
                    font-size: 34rpx;
                    margin-left:20rpx;
                    height: 126rpx;
                    display: flex;
                    justify-content: flex-start;
                    flex-direction: column;
                    .company{
                        font-family: 'PingFangSC-Regular';
                        font-size: 34rpx;
                        color: black;
                        margin-top: -16rpx;
                    }
                    .text-ul{
                        list-style: none;
                        .text-li{
                            float: left;
                            height: 40rpx;
                            width: auto;
                            background-color: rgba(252, 184, 19,.2);
                            font-family: 'PingFangSC-Regular';
                            font-size: 24rpx;
                            color: rgb(202, 146, 9);
                            display: flex;
                            align-items: center;
                            margin-right: 10rpx;
                            padding: 0rpx 10rpx 0 10rpx;
                            margin: 6rpx;
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
                margin-top: 1.6rpx;
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
        margin-top: 46rpx;
        margin-bottom: 206rpx;
        text-align: center;
        display: flex;
        justify-content: center;
        background:rgb(252, 184, 19);
        color: black;
        font-weight: 550;
        border: none;
    }
}
</style>
