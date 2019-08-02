<template>
    <div>
        <div class="img-head">
            <img @click="headPreviewImage" src="/static/images/mask.png" />
        </div>
        <div class="title">吉峰机械工程有限公司</div>
        <div class="tag">
            <ul class="text-ul">
                <li class="text-li">挖填方 * 6</li>
                <li class="text-li">运输队 * 9</li>
            </ul>
        </div>
        <div class="detail">
            <p class="one">"该班组技术好，态度好，做事负责"</p>
            <p class="two">推荐人：张三 项目经理</p>
            <p class="three">深圳市新丰建筑工程有限公司</p>
        </div>
        <div class="brief">成立于 1998 年，总部位于深圳市福田区，曾多次获得深圳市政府颁发的工程质量奖项，团队规模在 500 人以上，拥有专业的设备。欢迎来电洽谈业务。</div>
        <button class="phone" @click="seePhone">{{phone}}</button>
    </div>
</template>
<script>
import fly from "@/services/WxApi";
export default {
    data(){
        return{
            phone:'查看联系方式'
        }
    },
    methods: {
        headPreviewImage() {
            wx.previewImage({
                current:
                    "", // 当前显示图片的http链接
                urls: [
                    ""
                ] // 需要预览的图片http链接列表
            });
        },
        seePhone() {
            let This = this
            This.$emit("alertframe", true);
            let data = {
                contractorId:10462
            }
            fly.post('/contractor/viewHQContractorContact',data).then(function (res) {
                console.log(res)
                This.phone = res.response.mobile
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
</style>
