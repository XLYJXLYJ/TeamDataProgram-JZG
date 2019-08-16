<template>
    <div>
        <goBackNav :title='title'></goBackNav>
        <div v-if="isAlert">
            <selfAlert
                v-bind:changeModel="ischangeModel"
                v-bind:isModel="ifMode"
                v-bind:val="alertType"
                @func="controlAlert"
            ></selfAlert>
        </div>
        <div>
            <div class="img-head">
                <img @click="headPreviewImage" :src="headimg" />
            </div>
            <div class="title">{{organizationName}}</div>
            <div class="tag">
                <ul class="text-ul">
                    <li v-for="(item,index) in ContractorProjectType" :key="index">
                        <span v-if="item.medalNum" class="text-li"> {{item.projectTypeName}}  &nbsp;<img style="width:16rpx;height:16rpx" src="/static/images/star.png" alt="">&nbsp; {{item.medalNum}}</span>
                    </li>
                </ul>
            </div>
            <div class="detail">
                <!-- <p class="one">"该班组技术好，态度好，做事负责"</p> -->
                <p class="two">推荐人：{{recommendUserName}} {{recommendUserPosition}}</p>
                <p class="three">{{recommendCompany}}</p>
                <img src="/static/images/good.png" alt="">
            </div>
            <div class="brief">{{contractorDesc}}</div>
            <button class="phone" @click="seePhone">{{phone}}</button>
        </div>

        <div class="fixedTab" v-if="isTop" :style="{top: navBarHeight + 'px'}">
            <div class="gene" :class="{'active':isTab}" @click="goOne">概况</div>
            <div v-if="projectPerformanceCount" class="achi" :class="{'active':!isTab}" @click="goachi">业绩<span class="num">{{projectPerformanceCount}}</span></div>
        </div>

        <div style="height: 80rpx;">
            <div class="tab" v-if="!isTop" :style="{top: navBarHeight + 'px'}">
                <div class="gene" :class="{'active':isTab}" @click="goOne">概况</div>
                <div v-if="projectPerformanceCount" class="achi" :class="{'active':!isTab}" @click="goachi">业绩<span class="num">{{projectPerformanceCount}}</span></div>
            </div>
        </div>


        <div v-if="isTab">
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
                    <span class="two">{{teamPersonCountName}}</span>
                </div>
                <div class="basic-sigle">
                    <span class="one">联系人:</span>
                    <span class="two">{{linkMan}}</span>
                </div>
            </div>
            <div class="work">
                <ul>
                    <title>施工报价 <span v-if="qtotal">({{qtotal}} 项)</span> </title>
                    <li v-for="(item,index) in subModels" :key="index">
                        <p>{{item.name}}</p>
                        <ul class="two-ul">
                            <li class="two-li" v-for="(twoItem,twoIndex) in item.quotationDetailList" :key="twoIndex">
                                <img src='/static/images/point.png' alt="">
                                <span class="one">{{twoItem.name}}</span>
                                <span class="two">{{twoItem.price}}元/m<sup style='height:6rpx;width:6rpx;font-size:18rpx;float:right'>2</sup></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="equip" v-if="equipmentCount">
                <p class="self"><span>自有设备( {{eqList.length}} 种)</span></p>
                <ul class="one-ul">
                    <li class="one-li" v-for="(item,index) in eqList" :key="index">
                        <div class="machine">{{item.remark}}<span class="num1">{{item.quantity}}</span></div> 
                        <div class="img-contain">
                            <ul class="two-ul">
                                <div v-for="(twoItem,twoIndex) in imgList" :key="twoIndex">
                                    <li class="two-li" v-if="twoIndex<6"><img @click="previewImage(twoItem,testImg)" :src='twoItem' /></li>
                                </div>
                                <!-- <li class="two-li" v-for="(twoItem,twoIndex) in eqList" :key="twoIndex"><img @click="previewImage" :src='twoItem' /></li> -->
                            </ul>
                            <div class="corner" v-if="item.imgs">
                                <div class="img-corner"><img src="/static/images/more.png"> </div>
                                <span class="number">{{item.imgs}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="!isTab" class="equip-two">
            <ul class="one-ul">
                <li class="one-li" v-for="(item,index) in list" :key="index">
                    <p class="self">{{item.projectName}}</p>
                    <p class="machine">{{item.areaFullName}}</p>
                    <div class="img-contain">
                        <ul class="three-ul">
                            <div v-for="(threeItem,threeIndex) in item.nearImgList" :key="threeIndex">
                                <li class="three-li" v-if="threeIndex<6"><img @click="previewImage(threeItem,item.nearImgList)" :src='threeItem' /></li>
                            </div>
                            <!-- <li class="two-li" v-for="(twoItem,twoIndex) in eqList" :key="twoIndex"><img @click="previewImage" :src='twoItem' /></li> -->

                        </ul>
                        <div class="corner" v-if="item.nearImgList.length">
                            <div class="img-corner"><img src="/static/images/more.png"> </div>
                            <span class="number">{{item.nearImgList.length}}</span>
                        </div>
                    </div>
                    <ul class="two-ul">
                        <li v-if="item.projectTypeName">
                            <div class="one"><img src="/static/images/1.png"></div>
                            <div class="two">{{item.projectTypeName}}</div>
                        </li>
                        <li v-if="item.startTimeStr">
                            <div class="one"><img src="/static/images/2.png"></div>
                            <div class="two">{{item.startTimeStr}} 至 {{item.endTimeStr}}</div>
                        </li>
                        <li v-if="item.prizeList">
                            <div class="one"><img src="/static/images/3.png"></div>
                            <div class="two">{{item.prizeList}}</div>
                        </li>
                        <li  v-if="item.employers">
                            <div class="one"><img src="/static/images/4.png"></div>
                            <div class="two">{{item.employers}}</div>
                        </li>
                        <li v-if="item.remarks">
                            <div class="one"><img src="/static/images/5.png"></div>
                            <div class="two">{{item.remarks}}</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
import selfAlert from "@/components/alert.vue";
import fly from "@/services/WxApi";
export default {
    data() {
        return {
            recommendCompany:'',
            recommendUserPosition:'',
            recommendUserName:'',
            joinSharePlanStatus:'',
            equipmentCount:'',
            title:'',
            isTab:'',
            qtotal:'',
            quantity:'',
            alertType:'',
            phone:'查看联系方式',
            organizationName:'', // 公司名称
            ContractorProjectType:'', // 标签
            contractorDesc:'',
            headimg:'',
            isTab:true,
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
            list:'',
            imgLength:'',
            imgList:'',
            imgListTwo:'',
            contractorId:'',
            teamPersonCount:'',
            projectPerformanceCount:'',
            testImg:['http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg','http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg','http://pic18.nipic.com/20111214/6834314_092609528357_2.jpg']
        };
    },
    onPageScroll: function(res) {
        let This = this
        if (res.scrollTop > 550) {
            This.isTop = true
            This.title = This.organizationName
        } else {
            This.isTop = false
        }
    },
    onLoad(options){
        let This = this
        This.contractorId = options.contractorId || wx.getStorageSync('contractorId')
        wx.setStorageSync('contractorId', This.contractorId) 
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
        This.phone = '查看联系方式'
        This.isAlert = false
        This.ifMode = false
        This.ischangeModel = false
        This.title = ''
        let data = {
            page:1,
            pageSize:5,
            contractorId:This.contractorId || wx.getStorageSync('contractorId')
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
            This.qtotal = resData.quotationBillModels.total
            This.eqList = resData.eqList
            This.quantity = resData.eqList.quantity
            This.imgList = resData.imgList
            This.teamPersonCount = resData.teamPersonCount
            This.projectPerformanceCount = resData.projectPerformanceCount
            This.equipmentCount = resData.equipmentCount
            This.recommendUserName = resData.recommendUserName || '暂无推荐人'
            This.recommendUserPosition = resData.recommendUserPosition || ''
            This.recommendCompany = resData.recommendCompany || ''
        })
        let dataTwo = {
            contractorId:This.contractorId || wx.getStorageSync('contractorId')
        }
        fly.post('/contractor/getProjectPerformanceList',dataTwo).then(function (res) {
            let resData = res.response
            This.list = resData.list
            console.log(This.list)
            This.list.map(
                function(item,index){
                    item.areaFullName = item.areaFullName.replace(/,/g, ' ' )
                }
            )
            This.list.map(
                function(item,index){
                    item.projectTypeName= item.projectTypeName.replace(/  /g, '' )
                }
            )
        })
    },
    onShow() {
        let This = this
        This.organizationName = ''
        This.ContractorProjectType = ''
        This.contractorDesc = ''
        This.headimg = ''
        let data = {
            page:1,
            pageSize:5,
            contractorId:This.contractorId || wx.getStorageSync('contractorId')
        }
        fly.post('/contractor/getProjectPerformanceList',data).then(function (res) {
            let resData = res.response.list[0]
            
        })
        fly.post('/contractor/getHQContractorDetail',data).then(function (res) {
            let resData = res.response
            This.ContractorProjectType = resData.contractorProjectTypes
            This.contractorDesc = resData.contractorDesc
            This.organizationName = resData.organizationName
            console.log(resData.headimg)
            if(resData.headimg == null){
                console.log('没有图片')
                This.headimg = '/static/images/user1.png'
            }else{
                console.log('没有图片')
                This.headimg = resData.headimg
            }
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
        // formatDate(date, fmt) {
        //     let This = this
        //     if (/(y+)/.test(fmt)) {
        //         fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        //     }
        //     let o = {
        //         'M+': date.getMonth() + 1,
        //         'd+': date.getDate(),
        //         'h+': date.getHours(),
        //         'm+': date.getMinutes(),
        //         's+': date.getSeconds()
        //     };
        //     for (let k in o) {
        //         if (new RegExp(`(${k})`).test(fmt)) {
        //         let str = o[k] + '';
        //         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : This.padLeftZero(str));
        //         }
        //     }
        //     return fmt;
        // },
        // padLeftZero(str) {
        //     return ('00' + str).substr(str.length);
        // },
        controlAlert(data) {
            console.log(data)
            let This = this
            This.isAlert = data
            This.ifMode = data 
            This.ischangeModel = data
        },
        goOne(){
            let This = this
            This.isTab = true
        },
        goachi(){
            let This = this
            This.isTab = false

        },
        // seePhone() {
        //     (this.ifMode = true), (this.ischangeModel = true);
        //     this.isAlert = true;
        // },
        conAlert(data) {
            if (data) {
                this.seePhone();
            }
        },
        headPreviewImage() {
            let This = this
            wx.previewImage({
                current:
                    This.headimg?This.headimg:'/static/images/user.png', // 当前显示图片的http链接
                urls: [
                    This.headimg?This.headimg:'/static/images/user.png'
                ] // 需要预览的图片http链接列表
            });
        },
        seePhone() {
            let This = this
            // This.$emit("alertframe", true);
            if(This.phone!='查看联系方式'){
                wx.makePhoneCall({
                    phoneNumber: This.phone
                })
            }else{
                let data = {
                    contractorId:This.contractorId || wx.getStorageSync('contractorId')
                }
                fly.post('/contractor/viewHQContractorContact',data).then(function (res) {
                    console.log(res)
                    This.alertType = res.response
                    This.phone = res.response.mobile == null? '查看联系方式':res.response.mobile
                    This.isAlert = true
                    This.ifMode = true
                    This.ischangeModel = true
                })
            }
        },
        getUserInfo (e) {
            let userInfo = JSON.parse(e.mp.detail.rawData)
            let data = {
                nickName:userInfo.nickName,
                headImg:userInfo.avatarUrl,
                gender:userInfo.gender,
                areaName:[userInfo.country,userInfo.province,userInfo.city]
            }
            fly.post('/contractor/weChatAuth',data).then(function (res) {
                wx.setStorageSync('token', res.response.authorization) 
                wx.setStorageSync('gender', res.response.gender) 
                wx.setStorageSync('mobile', res.response.mobile) 
                wx.setStorageSync('nickName', res.response.nickName) 
                wx.setStorageSync('username', res.response.username) 
            })
        }
    },
    components: {
        goBackNav,
        selfAlert
    }
};
</script>
<style lang="scss" scoped>
.img-head {
    height: 400rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 240rpx;
        height: 240rpx;
        border-radius: 8rpx;
    }
}
.title {
    font-family: "PingFangSC-Regular";
    font-size: 52rpx;
    text-align: center;
    margin: 16rpx 0 16rpx 0;
}
.tag {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    .text-ul {
        list-style: none;
        .text-li {
            float: left;
            height: 40rpx;
            width: auto;
            background-color: rgba(252, 184, 19, 0.2);
            font-family: "PingFangSC-Regular";
            font-size: 24rpx;
            color: rgb(202, 146, 9);
            display: flex;
            align-items: center;
            margin-right: 10rpx;
            padding: 0rpx 10rpx 0 10rpx;
            margin: 6rpx;
            border-radius: 8rpx;
        }
    }
}
.detail {
    width: 670rpx;
    height: 120rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 48rpx;
    padding: 24rpx 0 24rpx 0;
    background: rgba(252, 184, 19, 0.1);
    position: relative;
    .one {
        font-size: 34rpx;
        color: black;
        font-family: "PingFangSC-Regular";
        text-align: center;
    }
    .two {
        font-size: 28rpx;
        color: #5c5a54;
        font-family: "PingFangSC-Regular";
        text-align: center;
    }
    .three {
        font-size: 28rpx;
        color: #5c5a54;
        font-family: "PingFangSC-Regular";
        text-align: center;
    }
    img{
        position: absolute;
        right: 0rpx;
        bottom: 0rpx;
        height: 78rpx;
        width:68rpx;
    }
}
.brief {
    width: 670rpx;
    font-size: 34rpx;
    color: black;
    font-family: "PingFangSC-Regular";
    margin: 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 48rpx;
}
.phone {
    width: 360rpx;
    height: 96rpx;
    background: rgb(252, 184, 19);
    font-size: 34rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 96rpx;
    border:none;
    outline: none;
    font-weight: 550;
    border-radius: 8rpx;
}
.phone::after{ border: none; }
.tab {
    display: flex;
    justify-content: space-around;
    margin-top: 96rpx;
    border-bottom:0.1rpx solid #e5e5e5;
    animation:moveIn 1s infinite;
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
    .gene {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
        // border-bottom:1rpx solid #e5e5e5;
    }
    .achi {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
        // border-bottom:1rpx solid #e5e5e5;
        .num{
            width: 32rpx;
            height: 32rpx;
            background: #efeff4;
            padding-left: 10rpx;
            padding-right: 10rpx;
            border-radius: 16rpx;
            font-size: 24rpx;
            margin-left: 10rpx;
            color: #a7a7a8;
            margin-top: -2rpx;
        }
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
    height: 80rpx;
    // padding-top: 40rpx;
    background: #fff;
    border-bottom:1rpx solid #e5e5e5;
    z-index: 999;
    animation:moveIn 1s infinite;
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
    .gene {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
        position: absolute;
        left: 0rpx;
        // border-bottom:1rpx solid #e5e5e5;
    }
    .achi {
        width: 50%;
        text-align: center;
        padding-bottom: 24rpx;
        font-family: "PingFang-SC-Semibold";
        position: absolute;
        right: 0rpx;
        // border-bottom:1rpx solid #e5e5e5;
        .num{
            width: 32rpx;
            height: 32rpx;
            background: #efeff4;
            padding-left: 10rpx;
            padding-right: 10rpx;
            border-radius: 16rpx;
            font-size: 24rpx;
            margin-left: 10rpx;
            color: #a7a7a8;
            margin-top: -2rpx;
        }
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
        margin-bottom: 16rpx;
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
            margin-top: -6rpx;
        }
    }
}
.work {
    width: 670rpx;
    min-height: 100rpx;
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
                padding-right: 10rpx;
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
                width: 80%;
                height: 8rpx;
                position: relative;
                top: -9rpx;
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
                .num1{
                    width: 32rpx;
                    height: 32rpx;
                    background: #efeff4;
                    padding-left: 10rpx;
                    padding-right: 10rpx;
                    border-radius: 16rpx;
                    font-size: 24rpx;
                    margin-left: 10rpx;
                    color: #a7a7a8;
                    margin-top: -2rpx;
                }
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
                        top: -4rpx;
                        left: 6rpx;
                    }
                }
            }
        }
    }
}
.equip-two {
    width: 670rpx;
    height: auto;
    margin: 0 auto;
    margin-top: 96rpx;
    .self {
        font-family: "PingFang-SC-Semibold";
        font-size: 36rpx;
        font-weight: 550;
    }
    .one-ul {
        .one-li {
            .machine {
                font-size: 30rpx;
                color: rgb(252, 184, 19);
                font-family: "PingFangSC-Regular";
                margin-bottom: 24rpx;
                z-index: 0;

            }

            .img-contain {
                position: relative;
                height: 458rpx;
                .three-ul{
                    display:inline;
                    white-space: nowrap;
                    li{
                        float:left;
                        width: 220rpx;
                        height: 222rpx;
                        display:block;
                        margin-right: 3rpx;
                        margin-bottom: 3rpx;
                        img {
                            width: 220rpx;
                            height: 222rpx;
                            border-right: 3rpx solid #fff;
                        }
                    }
 
                }
                .corner {
                    position: absolute;
                    right: 6rpx;
                    bottom: 12rpx;
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
                        position: relative;
                        top: -4rpx;
                        left: 6rpx;
                    }
                }
            }
            .two-ul {
                margin-bottom: 40rpx;
                margin-top: 13rpx;
                height: 300rpx;
                li {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .one {
                        width: 32rpx;
                        height: 32rpx;
                        display: inline-block;
                        margin-top: 3rpx;
                        img{
                            width: 32rpx;
                            height: 32rpx;
                        }
                    }
                    .two {
                        width: 618rpx;
                        display: inline-block;
                        font-size: 30rpx;
                        color: black;
                        font-family: "PingFangSC-Regular";
                    }
                }
            }
        }
    }
}
</style>
