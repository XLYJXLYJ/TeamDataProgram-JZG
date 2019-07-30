<template>
    <div class="recommend">
        <goBackNav></goBackNav>
        <!-- <div class="no-recommend">
          <img>

        </div>-->
        <div class="content">
            <ul>
                <li>
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">2019年7月13日推荐</span>
                    <p class="cause">原因：资料不全</p>
                </li>
                <li>
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">2019年7月13日推荐</span>
                    <p class="cause">原因：资料不全</p>
                </li>
                <li>
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">2019年7月13日推荐</span>
                    <p class="cause">原因：资料不全</p>
                </li>
                <li>
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">2019年7月13日推荐</span>
                    <p class="cause">原因：资料不全</p>
                </li>
            </ul>
        </div>
        <div class="shareButton">推荐班组</div>
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
.recommend {
    position: absolute;
    width: 100%;
    height: 100%;
    .no-recommend {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -44rpx;
        margin-left: -46rpx;
        img {
            width: 96rpx;
            height: 96rpx;
            background: red;
        }
    }
    .shareButton {
        position: absolute;
        bottom: 40rpx;
        left: 40rpx;
        width: 670rpx;
        height: 96rpx;
        font-family: "PingFangSC-Medium";
        font-size: 34rpx;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(252, 184, 19);
        color: black;
        font-weight: 550;
        border: none;
    }
    .content {
        ul {
            width: 100%;
            height: auto;
            margin-top: 40rpx;
            li {
                width: 670rpx;
                margin: 0 auto;
                padding: 24rpx 0 24rpx 0;
                border-bottom: 1px solid rgb(204, 204, 204);
                .company-name {
                    font-size: 34rpx;
                    color: black;
                    font-family: "PingFangSC-Regular";
                    margin-bottom: -10rpx;
                }
                .status {
                    font-size: 28rpx;
                    color: #6c6962;
                    font-family: "PingFangSC-Light";
                }
                .time {
                    font-size: 28rpx;
                    color: black;
                    font-family: "PingFangSC-Light";
                }
                .cause {
                    font-size: 28rpx;
                    color: #6c6962;
                    font-family: "PingFangSC-Light";
                }
            }
        }
    }
}
</style>
