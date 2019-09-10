<template>
    <div class="aboutUs">
        <goBackNav title url='/pages/index/main'></goBackNav>
        <img class="logo" src="/static/images/logo.png" alt />
        <p class="about">深圳市建造工科技有限公司是一家专注于服务建筑劳务领域的移动互联网公司。“建造工”为本公司倾力打造研发运营的建筑劳务互联网平台，致力于用互联网的方式解决行业痛点，提供专业优质的服务。建造工由顶级互联网研发团队以及资深的建筑工程团队组成，现已获得专业投资公司与多家实力雄厚的建筑公司的巨额投资及强力支持，助力传统建筑行业升级，打造建筑劳务领域专业的互联网入口。</p>
        <div class="share">
            <ul class="one-ul">
                <li class="one-li">
                    <p class="one">客服微信</p>
                    <p class="two">jzgkf_2015</p>
                </li>
                <li class="one-li">
                    <p class="one">客服电话</p>
                    <p class="two">0755-33940386</p>
                </li>
                <li class="one-li">
                    <p class="one">微信公众号</p>
                    <p class="two">公众号搜索：建造工信息平台</p>
                </li>

                <div class="about-bottom">
                    <p>www.jianzaogong.com</p>
                    <p>Copyright © 2017 深圳市建造工科技有限公司</p>
                </div>
            </ul>
        </div>
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
        position: relative;
        top:96rpx;
        width: 100%;
        margin-bottom: 40rpx;
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
