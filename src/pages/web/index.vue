<template>
    <div class="aboutUs">
        <web-view src="https://m.jianzaogong.com/h5/explains/pages/userAgreement.html"></web-view>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
export default {
    components: {
        goBackNav
    }
};
</script>
<style lang="scss" scoped>
.aboutUs {
    width: 100%;
    height: 100%;
    .logo {
        width: 420rpx;
        height: 120rpx;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 96rpx 0 96rpx 0;
    }
    .about {
        width: 670rpx;
        margin: 0 auto;
        font-size: 28rpx;
        color: black;
        font-family: "PingFangSC-Regular";
    }
    .one-ul {
        width: 100%;
        height: 100%;
        margin-top: 70rpx;
        .one-li {
            width: 670rpx;
            margin: 24rpx auto;
            height: 120rpx;
            .one {
                font-size: 28rpx;
                color: #6c6962;
                font-family: "PingFangSC-Regular";
            }
            .two {
                font-size: 34rpx;
                color: black;
                font-family: "PingFangSC-Regular";
            }
            .two-ul {
                .two-li {
                    float: left;
                    margin-right: 32rpx;
                    img {
                        width: 144rpx;
                        height: 144rpx;
                        margin-top: 16rpx;
                    }
                }
            }
        }
    }
    .about-bottom {
        position: fixed;
        bottom: 40rpx;
        width: 100%;
        p {
            display: flex;
            justify-content: center;
            font-size: 20rpx;
            color: #CCCCCC;
            font-family: "PingFangSC-Regular";
        }
    }
}
</style>
