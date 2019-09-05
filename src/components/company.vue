<template>
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
        <button style="border:none;height:96rpx;" class="phone" @click="seePhone">{{phone}}</button>
    </div>
</template>
<script>
import fly from "@/services/WxApi";
export default {
    props:['contractorId'],
    data(){
        return{
            phone:'查看联系方式',
            organizationName:'', // 公司名称
            ContractorProjectType:'', // 标签
            contractorDesc:'',
            headimg:''
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
            contractorId:This.contractorId
        }
        fly.post('/contractor/getProjectPerformanceList',data).then(function (res) {
            let resData = res.response.list[0]
            This.organizationName = resData.organizationName
        })
        fly.post('/contractor/getHQContractorDetail',data).then(function (res) {
            let resData = res.response
            This.ContractorProjectType = resData.contractorProjectTypes
            This.contractorDesc = resData.contractorDesc
            This.headimg = resData.headimg
        })
    },
    methods: {
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
            This.$emit("alertframe", true);
            let data = {
                contractorId:This.contractorId
            }
            fly.post('/contractor/viewHQContractorContact',data).then(function (res) {
                This.phone = res.response.mobile == null? '查看联系方式':res.response.mobile
            })
        }
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
button::after {
    border: none;
}
</style>
