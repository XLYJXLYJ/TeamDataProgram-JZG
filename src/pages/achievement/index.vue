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
            <div class="img-head">
                <img @click="headPreviewImage" :src="headimg" />
            </div>
            <div class="title">{{organizationName}}</div>
            <div class="tag">
                <ul class="text-ul">
                    <li class="text-li" v-for="(item,index) in ContractorProjectType" :key="index">{{item.projectTypeName}} * {{item.medalNum}}</li>
                </ul>
            </div>
            <!-- <div class="detail">
                <p class="one">"该班组技术好，态度好，做事负责"</p>
                <p class="two">推荐人：张三 项目经理</p>
                <p class="three">深圳市新丰建筑工程有限公司</p>
            </div> -->
            <div class="brief">{{contractorDesc}}</div>
            <button style="border:none;" class="phone" @click="seePhone">{{phone}}</button>
        </div>
         <div :class="{'fixedTab':isTop,'tab':!isTop}" :style="{top: navBarHeight + 'px'}">
            <div class="gene" @click="gointro" style="border-bottom:1rpx solid #ccc;">概况</div>
            <div class="achi active">业绩</div>
        </div>
        <div class="equip">
            <ul class="one-ul">
                <li class="one-li" v-for="(item,index) in list" :key="index">
                    <p class="self">{{item.projectName}}</p>
                    <p class="machine">{{item.areaFullName}}</p>
                    <div class="img-contain">
                        <ul class="three-ul">
                            <div v-for="(threeItem,threeIndex) in imgList" :key="threeIndex">
                                <li class="three-li" v-if="threeIndex<3"><img @click="previewImage(threeItem,imgList)" :src='threeItem' /></li>
                            </div>
                            <!-- <li class="two-li" v-for="(twoItem,twoIndex) in eqList" :key="twoIndex"><img @click="previewImage" :src='twoItem' /></li> -->

                        </ul>
                        <div class="corner">
                            <div class="img-corner"><img src="/static/images/more.png"> </div>
                            <span class="number">{{imgList.length}}</span>
                        </div>
                    </div>
                    <ul class="two-ul">
                        <li>
                            <div class="one"><img src="/static/images/1.png"></div>
                            <div class="two">{{item.projectName}}</div>
                        </li>
                        <li>
                            <div class="one"><img src="/static/images/2.png"></div>
                            <div class="two">{{item.startTime}}</div>
                        </li>
                        <li>
                            <div class="one"><img src="/static/images/3.png"></div>
                            <div class="two">{{item.prizeList}}</div>
                        </li>
                        <li>
                            <div class="one"><img src="/static/images/4.png"></div>
                            <div class="two">{{item.employers}}</div>
                        </li>
                        <li>
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
import company from "@/components/company.vue";
import fly from "@/services/WxApi";
export default {
    data() {
        return {
            phone:'查看联系方式',
            organizationName:'', // 公司名称
            ContractorProjectType:'', // 标签
            contractorDesc:'',
            headimg:'',

            ifMode: false,
            ischangeModel: false,
            isAlert: false,
            isTop:false,
            statusBarHeight: "", // 状态栏高度
            titleBarHeight: "", // 标题栏高度
            navBarHeight: "", // 导航栏总高度
            list:'',
            contractorId:'',
            imgList:['http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg','http://img.redocn.com/sheji/20141219/zhongguofengdaodeliyizhanbanzhijing_3744115.jpg','http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg','http://pic18.nipic.com/20111214/6834314_092609528357_2.jpg']
        };
    },
    onPageScroll: function(res) {
        let This = this
        if (res.scrollTop > 450) {
            This.isTop = true
        } else {
            This.isTop = false
        }
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
            console.log('获取工程业绩')
            console.log(res.response)
            let resData = res.response.list[0]
            This.organizationName = resData.organizationName
        })
        fly.post('/contractor/getHQContractorDetail',data).then(function (res) {
            console.log('获取优质班组详细信息')
            let resData = res.response
            console.log(resData)
            This.ContractorProjectType = resData.contractorProjectTypes
            This.contractorDesc = resData.contractorDesc
            This.headimg = resData.headimg
        })
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
            contractorId:This.contractorId || wx.getStorageSync('contractorId')
        }
        fly.post('/contractor/getProjectPerformanceList',data).then(function (res) {
            let resData = res.response
            console.log(222)
            console.log(resData)
            This.list = resData.list
        })
    },
    // onLoad(options){
    //     let This = this
    //     This.contractorId = options.contractorId
    //     console.log(options)
    // },
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
        gointro(){
            wx.navigateTo({
                url:'/pages/introdution/main'
            })
        },
        controlAlert(data) {
            this.isAlert = data;
        },
        // seePhone() {
        //     (this.ifMode = true), (this.ischangeModel = true);
        //     this.isAlert = true;
        // },
        // conAlert(data) {
        //     if (data) {
        //         this.seePhone();
        //     }
        // },
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
            This.isAlert = true
            This.ifMode = true
            This.ischangeModel = true
            let data = {
                contractorId:This.contractorId || wx.getStorageSync('contractorId')
            }
            fly.post('/contractor/viewHQContractorContact',data).then(function (res) {
                console.log(res)
                This.phone = res.response.mobile == null? '查看联系方式':res.response.mobile
            })
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
.img-head {
    height: 400rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 240rpx;
        height: 240rpx;
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
        }
    }
}
.detail {
    width: 670rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    margin-top: 48rpx;
    padding: 24rpx 0 24rpx 0;
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
}
.brief {
    width: 670rpx;
    font-size: 34rpx;
    color: black;
    font-family: "PingFangSC-Regular";
    margin: 0 auto;
    display: flex;
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
        }
    }
}
.detail {
    width: 670rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    margin-top: 48rpx;
    padding: 24rpx 0 24rpx 0;
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
}
.brief {
    width: 670rpx;
    font-size: 34rpx;
    color: black;
    font-family: "PingFangSC-Regular";
    margin: 0 auto;
    display: flex;
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
}
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
    top: 160rpx;
    width: 100%;
    height: 100rpx;
    padding-top: 40rpx;
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
.equip {
    width: 670rpx;
    height: auto;
    margin: 0 auto;
    margin-top: 96rpx;
    .self {
        font-family: "PingFang-SC-Semibold";
        font-size: 36rpx;
        font-weight: 550;
        margin-bottom: 18rpx;
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
                .three-ul{
                    display: flex;
                    justify-content: space-around;
                    img {
                        width: 220rpx;
                        height: 222rpx;
                        border-right: 3rpx solid #fff;
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
                    }
                }
            }
            .two-ul {
                margin-bottom: 40rpx;
                li {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    .one {
                        width: 32rpx;
                        height: 32rpx;
                        display: inline-block;
                        margin-top: 6rpx;
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
