<template>
    <div class="card-contain">
        <div :class="{'fixedSelectCity':isTop,'selectCity':!isTop}" ref="selectCityDom" :style="{top: navBarHeight + 'px'}">
            <div class="city">深圳市<span class=""></span></div>
            <span style="color:rgb(204,204,204)">|</span>
            <div>
                <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                    <div class="select picker" type="default">{{ClassClassification}} <img style="width:20.2rpx;height:16rpx;" src="/static/images/bottom.png" alt=""></div>
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
            <li class="card-li" @click="goIntro">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                   <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
                    </div>
                </div>
                <div class="right">
                    <img src="/static/images/right.png" alt="">
                </div>
            </li>
            <li class="card-li">
                <div class="left">
                    <div class="img">
                        <img src="/static/images/mask.png" alt="">
                    </div>
                    <div class="text-detail">
                        <div class="company">吉峰机械工程有限公司</div>
                        <div>
                            <ul class="text-ul">
                                <li class="text-li">挖填方 * 6</li>
                                <li class="text-li">运输队 * 9</li>
                            </ul>
                        </div>
                        <div class="achievement">8 项工程业绩</div>
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
        ClassClassification:'班组分类', // 班组分类
        mode: 'multiLinkageSelector',
        isTop:false,
        statusBarHeight: "", // 状态栏高度
        titleBarHeight: "", // 标题栏高度
        navBarHeight: "", // 导航栏总高度
        date:'', //不填写默认今天日期，填写后是默认日期
        //multiArray: [['工装/家装/房建/园建','土建混凝土结构','土石方/爆破','桩/支护/地基','市政配套','路桥隧道/地铁/铁路','水利/港航','机电工程','其他'], [{id:'100',name:"防水补漏"},{id:'2',name:"贴砖 (装修)"},{id:'3',name:"砌墙/抹灰"},{id:'4',name:"木工 (装修)"},{id:'5',name:"吊顶 (装修)"},{id:'6',name:"油漆/涂料"}, {id:'7',name:"不锈钢/玻璃"},{id:'8',name:"门窗/幕墙"},{id:'9',name:"木地板/窗帘"},{id:'10',name:"水电安装"},{id:'11',name:"安防弱电系统"},{id:'12',name:"暖通安装"},{id:'13',name:"电梯设备"},{id:'14',name:"消防"},{id:'15',name:"园林景观小品"},{id:'16',name:"古建筑"},{id:'17',name:"轻钢隔墙"}]],
        multiArray:[],
        multiIndex: [0,0],
        Array:'', // 接受到的选择器总数据
        selectIndex:'' // 选中的班组index位置
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
            let projectType = this.Array[one].childList[two].projectType
            console.log(projectType)
            this.getClass(projectType)
        },
        getClass(index){
            let data = {
                page:1,
                pageSize:5,
                projectType:index,
                area:''
            }
            fly.post('/contractor/getHQContractorList',data).then(function (data) {
                console.log(data)
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
