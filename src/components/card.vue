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
       

        multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],
        objectMultiArray: [
        [
            {
            id: 0,
            name: '无脊柱动物'
            },
            {
            id: 1,
            name: '脊柱动物'
            }
        ], [
            {
            id: 0,
            name: '扁性动物'
            },
            {
            id: 1,
            name: '线形动物'
            },
            {
            id: 2,
            name: '环节动物'
            },
            {
            id: 3,
            name: '软体动物'
            },
            {
            id: 3,
            name: '节肢动物'
            }
        ]
        ],
        multiIndex: [0, 0]

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
    methods: {
        goIntro(){
            wx.redirectTo({
                url: '../introdution/main'
            })
        },
        bindMultiPickerChange: function (e) {
            console.log('picker发送选择改变，携带值为', e)
        },
        bindMultiPickerColumnChange: function (e) {
            console.log('修改的列为', e, '，值为', e);
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
