<template>
    <div>
        <div v-if="isAlert">
            <!--弹窗的页面-->
            <div class="modalMask" v-if="isModel" @click="hidePanel"></div>
            <div class="modalDialog" v-if="changeModel">
                <div class="modalContent">
                    <img src="/static/images/share.png" />
                    <p class="contentTip">{{titleAlert}}</p>
                    <p class="detail">{{content}}</p>
                    <button @click="goWhere">{{text}}</button>
                </div>
            </div>
        </div>

        <goIndex :title='title'></goIndex>


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
            <div class="detail1" v-if="recommendUserName">
                <p class="one">{{recommendDesc}}</p>
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
                    <title v-if="qtotal">施工报价<span>({{qtotal}} 项)</span> </title>
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
                        <div class="img-contain" v-if="imgList">
                            <ul class="two-ul">
                                <div v-for="(twoItem,twoIndex) in imgList" :key="twoIndex">
                                    <li class="two-li" v-if="twoIndex<6"><img @click="previewImage(twoItem,imgList)" :src='twoItem' /></li>
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
                    <div class="img-contain" v-if="item.nearImgList">
                        <ul class="three-ul">
                            <div v-for="(threeItem,threeIndex) in item.nearImgList" :key="threeIndex">
                                <li class="three-li" v-if="threeIndex<6" @click="previewImage1(threeItem,item.nearImgList)"><img :src='threeItem' /></li>
                            </div>
                            <!-- <li class="two-li" v-for="(twoItem,twoIndex) in eqList" :key="twoIndex"><img @click="previewImage" :src='twoItem' /></li> -->

                        </ul>
                        <div class="corner" v-if="item.nearImgList.length>5">
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
import goIndex from "@/components/goIndex.vue";
import selfAlert from "@/components/alert.vue";
import fly from "@/services/WxApi";
export default {
    data() {
        return {
            val:'',
            titleAlert:'',
            content:'',
            text:'',
            recommendDesc:'',
            recommendCompany:'',
            recommendUserPosition:'',
            recommendUserName:'',
            joinSharePlanStatus:'',
            equipmentCount:'',
            title:'',
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
            isModel:'',
            changeModel:'',
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
        if (res.scrollTop > 400) {
            This.isTop = true
            // This.title = This.organizationName
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
        This.isTab = true
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
            This.recommendUserName = resData.recommendUserName
            This.recommendUserPosition = resData.recommendUserPosition || ''
            This.recommendCompany = resData.recommendCompany || ''
            This.recommendDesc = resData.recommendDesc
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

            if(res.response.mobile == null){
                This.phone = '查看联系方式'
            }else{
                This.phone = res.response.mobile
            }
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
                    if(!item.nearImgList){
                        item.nearImgList = []
                        item.nearImgList = item.nearImgList.concat(item.farImgList)
                        item.nearImgList = item.nearImgList.concat(item.evaluateImgList)
                        if(item.nearImgList[0]==null&&item.nearImgList[1]==null){
                            item.nearImgList = null
                        }
                    }else{
                        item.nearImgList = item.nearImgList.concat(item.farImgList)
                        item.nearImgList = item.nearImgList.concat(item.evaluateImgList)
                    }
                }
            )
            console.log(This.list)
        })
    },
    onShareAppMessage: (res) => {
        console.log(res)
    },
    // onShow() {
    //     let This = this
    //     This.organizationName = ''
    //     This.ContractorProjectType = ''
    //     This.contractorDesc = ''
    //     This.headimg = ''
    //     let data = {
    //         page:1,
    //         pageSize:5,
    //         contractorId:This.contractorId || wx.getStorageSync('contractorId')
    //     }
    //     fly.post('/contractor/getProjectPerformanceList',data).then(function (res) {
    //         let resData = res.response.list[0]
            
    //     })
    //     fly.post('/contractor/getHQContractorDetail',data).then(function (res) {
    //         let resData = res.response

    //     })
    // },

    methods: {
        previewImage(current,urls) {
            wx.previewImage({
                current:current, // 当前显示图片的http链接
                urls:urls // 需要预览的图片http链接列表
            });
        },
        previewImage1(current,urls) {
            console.log('2222')
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
        // controlAlert(data) {
        //     console.log(data)
        //     let This = this
        //     This.isAlert = data
        //     This.ifMode = data 
        //     This.ischangeModel = data
        // },
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
                This.isAlert = true
                This.isModel = true
                This.changeModel = true
                console.log('tantantatn')
                let data = {
                    contractorId:This.contractorId || wx.getStorageSync('contractorId')
                }
                fly.post('/contractor/viewHQContractorContact',data).then(function (res) {
                    console.log(res)
                    This.val = res.response

                    if(This.val.alertType==1){
                        This.titleAlert = '查看联系方式'
                        This.content = '您已查看 '+This.val.viewCount+' 个班组的联系方式，您剩余 '+This.val.remainCount+' 次班组联系方式查看机会。'
                        This.text = '好的'
                    }else if(This.val.alertType==2){
                        This.titleAlert = '查看联系方式'
                        This.content = '您已查看 '+This.val.viewCount+' 个班组的联系方式，请加入共建共享计划获得更多权限，成功通过审核，可增加 ' +  This.val.joinAddCount +' 次的班组查看权限。'
                        This.text = '立即加入共建共享计划'
                    }else{
                        This.titleAlert = '获取更多班组联系方式'
                        This.content = '您已查看 '+This.val.viewCount+' 个班组的联系方式，您可推荐新班组获得更多的权限。每成功推荐1个新班组，可增加 ' + This.val.joinAddCount +' 次的班组查看权限'
                        This.text = '推荐班组'
                    }

                    if(res.response.mobile == null){
                        This.phone = '查看联系方式'
                    }else{
                        This.phone = res.response.mobile
                    }
                    console.log(This.isAlert)
                    console.log(This.isModel)
                    console.log(This.changeModel)

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
                if(res.response.gender == 1 ){
                    wx.setStorageSync('gender', '男') 
                }else{
                    wx.setStorageSync('gender', '女') 
                }
                wx.setStorageSync('mobile', res.response.mobile) 
                wx.setStorageSync('nickName', res.response.nickName) 
                wx.setStorageSync('username', res.response.username) 
            })
        },
        hidePanel: function(event) {
            //这句是说如果我们点击到了id为myPanel以外的区域
            this.$emit("func", false);
        },
        goWhere(){
            let This = this
            if(This.text == '好的'){
                This.changeModel = !This.changeModel;
                This.isModel = !This.isModel;
                This.$emit("func", false);
            }else if(This.text == '立即加入共建共享计划'){
                wx.reLaunch({
                    url:'/pages/welcome/main'
                })
            }else{
                wx.reLaunch({
                    url:'/pages/welcomeClass/main'
                })
            }
        }
    },
    components: {
        goIndex,
        selfAlert
    }
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
    z-index: 900;
    color: #fff;
}
.modalDialog {
    box-sizing: border-box;
    width: 590rpx;
    height: auto;
    overflow: hidden;
    position: fixed;
    top: 30%;
    left: 0;
    z-index: 999;
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
    }
    .detail {
        font-size: 30rpx;
        color: rgb(88, 88, 88);
        padding: 0 40rpx 0 40rpx;
        font-family: "PingFangSC-Regular";
    }
    button {
        width: 510rpx;
        height: 96rpx;
        margin-top: 20rpx;
        font-size: 34rpx;
        color: black;
        font-family: "PingFangSC-Medium";
        font-weight: 550;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(252, 184, 19);
        border: none;
        margin-bottom: 40rpx;
    }
}
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
    width: 90%;
    font-family: "PingFangSC-Regular";
    font-size: 52rpx;
    text-align: center;
    margin: 16rpx 0 16rpx 0;
    margin: 0 auto;
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
.detail1 {
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
.phone::after{ border: none;}
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
            padding-left: 15rpx;
            padding-right: 15rpx;
            padding-bottom:2rpx;
            border-radius: 16rpx;
            font-size: 24rpx;
            margin-left: 10rpx;
            color: #a7a7a8;
            margin-top: -4rpx;
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
            padding-left: 15rpx;
            padding-right: 15rpx;
            padding-bottom:2rpx;
            border-radius: 16rpx;
            font-size: 24rpx;
            margin-left: 10rpx;
            color: #a7a7a8;
            margin-top: -4rpx;
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
                    padding-left: 15rpx;
                    padding-right: 15rpx;
                    padding-bottom:2rpx;
                    border-radius: 16rpx;
                    font-size: 24rpx;
                    margin-left: 10rpx;
                    color: #a7a7a8;
                    margin-top: -8rpx;
                }
            }
            .img-contain {
                position: relative;
                height: 436rpx;
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
                        z-index: 999;
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
