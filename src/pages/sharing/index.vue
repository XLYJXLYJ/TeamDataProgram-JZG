<template>
    <div>
        <goBackNav title="共建共享计划"></goBackNav>
        <div class="share">
            <ul class="one-ul">
                <li class="one-li">
                    <p class="one">加入状态</p>
                    <p class="two">审核中</p>
                </li>
                <li class="one-li">
                    <p class="one">手机号码</p>
                    <p class="two">13610293812</p>
                </li>
                <li class="one-li">
                    <p class="one">姓名</p>
                    <p class="two">张晓波</p>
                </li>
                <li class="one-li">
                    <p class="one">所在公司</p>
                    <p class="two">深圳市新丰建筑工程有限公司</p>
                </li>
                <li class="one-li">
                    <p class="one">职位</p>
                    <p class="two">项目经理</p>
                </li>
                <li class="one-li">
                    <p class="one">在职证明</p>
                    <ul class="two-ul">
                        <li class="two-li">
                            <img src="/static/images/mask.png" />
                        </li>
                        <li class="two-li">
                            <img src="/static/images/mask.png" />
                        </li>
                        <li class="two-li">
                            <img src="/static/images/mask.png" />
                        </li>
                    </ul>
                </li>
                <li class="one-li"></li>
                <li class="one-li">
                    <p style="color:rgb(252,184,19)">建筑业优质班组共建共享计划规则</p>
                </li>
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
.share {
    .one-ul {
        width: 100%;
        height: 100%;
        margin-top: 48rpx;
        .one-li {
            width: 670rpx;
            margin: 0 auto;
            height: 120rpx;
            .one {
                font-size: 28rpx;
                color: black;
                font-family: "PingFangSC-Regular";
            }
            .two {
                font-size: 34rpx;
                color: #6c6962;
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
}
</style>
