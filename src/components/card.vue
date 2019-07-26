<template>
    <div class="card-contain">
        <div :class="{'fixedSelectCity':isTop,'selectCity':!isTop}" ref="selectCityDom">
            <div class="city">深圳市<span class=""></span></div>
            <span style="color:rgb(204,204,204)">|</span>
            <div>
                <div class="select" type="default" @click="showMulLinkageTwoPicker">{{ClassClassification}}</div>
                    <mp-picker ref="mpPicker" :mode="mode" themeColor="rgb(252,184,19)" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mp-picker>
                <span></span>
            </div>
        </div>
        <ul class="card-ul">
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
        pickerValueArray: [
            {
            label: '飞机票',
            value: 100,
            children: [
                {
                label: '经济舱',
                value: 101
                },
                {
                label: '商务舱',
                value: 102
                }
            ]
            },
            {
            label: '火车票',
            value: 200,
            children: [
                {
                label: '卧铺',
                value: 210
                },
                {
                label: '坐票',
                value: 202
                },
                {
                label: '站票',
                value: 203
                }
            ]
            },
            {
            label: '汽车票',
            value: 300,
            children: [
                {
                label: '快班',
                value: 301
                },
                {
                label: '普通',
                value: 302
                }
            ]
            }
        ],
        pickerValueDefault: [1, 0]
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
    methods: {
        showMulLinkageTwoPicker() {
            this.$refs.mpPicker.show();
        },
        onConfirm(e) {
            console.log(e);
            this.ClassClassification = e.label
        },
        onChange(e) {
            console.log(e);
        },
        onCancel(e) {
            console.log(e);
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
        padding-top: 76rpx;
        height: 66rpx;
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
        padding-top: 76rpx;
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
