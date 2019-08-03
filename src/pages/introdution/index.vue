<template>
    <div>
        <goBackNav></goBackNav>
        <div v-if="isAlert">
            <selfAlert
                v-bind:changeModel="ischangeModel"
                v-bind:isModel="ifMode"
                v-bind:val="0"
                @func="controlAlert"
            ></selfAlert>
        </div>

        <div>
            <company @alertframe="conAlert"></company>
        </div>

        <div :class="{'fixedTab':isTop,'tab':!isTop}" :style="{top: navBarHeight + 'px'}">
            <div class="gene active">概况</div>
            <div class="achi" @click="goachi">业绩</div>
        </div>


        <div class="basic">
            <div class="basic-sigle">
                <span class="one">服务地区:</span>
                <span class="two">{{areaName}}</span>
            </div>
            <div class="basic-sigle">
                <span class="one">主营业务:</span>
                <span class="two">{{projectTypeName}}</span>
            </div>
            <div class="basic-sigle">
                <span class="one">人员规模:</span>
                <span class="two">101-200人</span>
            </div>
            <div class="basic-sigle">
                <span class="one">联系人:</span>
                <span class="two">{{linkMan}}</span>
            </div>
        </div>
        <div class="work">
            <ul>
                <title>施工报价(9项)</title>
                <li v-for="(item,index) in subModels" :key="index">
                    <p>{{item.name}}</p>
                    <ul class="two-ul">
                        <li class="two-li" v-for="(twoItem,twoIndex) in item.quotationDetailList" :key="twoIndex">
                            <img src='/static/images/point.png' alt="">
                            <span class="one">{{twoItem.name}}</span>
                            <span class="two">{{twoItem.price}}元/m2</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="equip">
            <p class="self">自有设备(2种)</p>
            <ul class="one-ul">
                <li class="one-li" v-for="(item,index) in eqList" :key="index">
                    <p class="machine">{{item.remark}}</p>
                    <div class="img-contain">
                        <ul class="two-ul">
                            <!-- <li class="two-li" v-for="(twoItem,twoIndex) in eqList" :key="twoIndex"><img @click="previewImage" :src='twoItem' /></li> -->
                            <li class="two-li" v-for="(twoItem,twoIndex) in imgList" :key="twoIndex"><img @click="previewImage(twoItem,testImg)" :src='twoItem' /></li>
                        </ul>

                        <div class="corner">
                            <div class="img-corner"><img src="/static/images/more.png"> </div>
                            <span class="number">{{item.imgs}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
import selfAlert from "@/components/alert.vue";
import company from "@/components/company.vue";
import fly from "@/services/WxApi";
export default {
    data() {
        return {
            ifMode: false,
            ischangeModel: false,
            isAlert: false,
            isTop:false,
            statusBarHeight: "", // 状态栏高度
            titleBarHeight: "", // 标题栏高度
            navBarHeight: "", // 导航栏总高度
            areaName:'',
            projectTypeName:'',
            teamPersonCountName:'',
            linkMan:'',
            subModels:'',
            eqList:'',
            imgLength:'',
            imgList:'',
            testImg:['http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg','http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg','http://pic18.nipic.com/20111214/6834314_092609528357_2.jpg']
        };
    },
    onPageScroll: function(res) {
        let This = this
        if (res.scrollTop > 400) {
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
        let data = {
            page:1,
            pageSize:5,
            contractorId:10462
        }
        fly.post('/contractor/getHQContractorDetail',data).then(function (res) {
            console.log('获取优质班组详细信息')
            let resData = res.response
            console.log(resData)
            This.areaName = resData.areaName
            This.projectTypeName = resData.projectTypeName
            This.teamPersonCountName = resData.teamPersonCountName
            This.linkMan = resData.linkMan
            This.subModels = resData.quotationBillModels.subModels
            This.eqList = resData.eqList
            This.imgList = resData.imgList
        })
    },
    methods: {
        previewImage(current,urls) {
            wx.previewImage({
                current:current, // 当前显示图片的http链接
                urls:urls // 需要预览的图片http链接列表
            });
            // wx.previewImage({
            //     current:"http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg", // 当前显示图片的http链接
            //     urls:['http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg','http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg','http://pic18.nipic.com/20111214/6834314_092609528357_2.jpg'] // 需要预览的图片http链接列表
            // });
        },
        controlAlert(data) {
            this.isAlert = data;
        },
        goachi(){
            wx.navigateTo({
                url:'/pages/achievement/main'
            })
        },
        seePhone() {
            (this.ifMode = true), (this.ischangeModel = true);
            this.isAlert = true;
        },
        conAlert(data) {
            if (data) {
                this.seePhone();
            }
        }
    },
    components: {
        goBackNav,
        selfAlert,
        company
    }
};
</script>
<style lang="scss" scoped>
.tab {
    display: flex;
    justify-content: space-around;
    margin-top: 96rpx;
    .gene {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
    }
    .achi {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
    }
    .active {
        border-bottom: 6rpx solid rgb(252, 184, 19);
    }
}
.fixedTab{
    // display: flex;
    // justify-content: space-around;
    // margin-top: 96rpx;
    position: fixed;
    // top: 160rpx;
    width: 100%;
    height: 100rpx;
    // padding-top: 40rpx;
    background: #fff;
    z-index: 999;
    .gene {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
        position: absolute;
        left: 0rpx;
    }
    .achi {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
        position: absolute;
        right: 0rpx;
    }
    .active {
        border-bottom: 6rpx solid rgb(252, 184, 19);
    }
}
.basic {
    width: 670rpx;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    margin-top: 96rpx;
    .basic-sigle {
        display: flex;
        justify-content: space-between;
        .one {
            width: 140rpx;
            font-size: 28rpx;
            color: rgb(159, 159, 159);
            font-family: "PingFangSC-Regular";
        }
        .two {
            width: 514rpx;
            font-size: 34rpx;
            color: black;
            font-family: "PingFangSC-Regular";
            margin-left: 16rpx;
        }
    }
}
.work {
    width: 670rpx;
    height: auto;
    margin: 0 auto;
    margin-top: 100rpx;
    title {
        font-family: "PingFang-SC-Semibold";
        font-size: 34rpx;
    }
    p {
        font-size: 28rpx;
        color: rgb(159, 159, 159);
        font-family: "PingFangSC-Regular";
        margin: 24rpx 0 24rpx 0;
    }
    .two-ul {
        .two-li {
            // display: flex;
            // justify-content: space-between;
            font-size: 34rpx;
            color: black;
            font-family: "PingFangSC-Regular";
            margin-bottom: 24rpx;
            position: relative;
            .one{
                position: absolute;
                left: 0rpx;
                z-index: 100;
                padding-right: 20rpx;
                background: #fff;
            }
            .two{
                position: absolute;
                right: 0rpx;
                z-index: 100;
                padding-left: 20rpx;
                background: #fff;
            }
            img{
                width: 100%;
                height: 8rpx;
                position: relative;
                top: -6rpx;
                z-index: 0;

            }
        }
    }
}
.equip {
    width: 670rpx;
    height: auto;
    margin: 0 auto;
    margin-top: 96rpx;
    .self {
        font-family: "PingFang-SC-Semibold";
        font-size: 34rpx;
        font-weight: 550;
        margin-bottom: 18rpx;
    }
    .one-ul {
        .one-li {
            .machine {
                font-size: 34rpx;
                color: black;
                font-family: "PingFangSC-Regular";
                margin-bottom: 24rpx;
                z-index: 0;
            }
            .img-contain {
                position: relative;
                .two-ul{
                    display: flex;
                    justify-content: space-around;
                    img {
                        width: 222rpx;
                        height: 222rpx;
                        border-right: 3rpx solid #fff;
                    }
                }

                .corner {
                    position: absolute;
                    right: 0rpx;
                    top: 0rpx;
                    background: rgba(0, 0, 0, 0.4);
                    padding: 0rpx 10rpx 0rpx 10rpx;
                    .img-corner {
                        display: inline-block;
                        width: 36rpx;
                        height: 28rpx;
                        img{
                            width: 36rpx;
                            height: 28rpx;
                        }
                    }
                    .number {
                        font-size: 30rpx;
                        color: white;
                        font-family: "PingFangSC-Regular";
                        margin-bottom: 6rpx;
                        margin-left: 6rpx;
                        position: relative;
                        top: -2rpx;
                    }
                }
            }
        }
    }
}
</style>
