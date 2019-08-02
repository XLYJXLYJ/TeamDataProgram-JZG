<template>
    <div>
        <goBackNav title="共建共享计划"></goBackNav>
        <div class="share">
            <ul class="one-ul">
                <li class="one-li">
                    <p class="one">加入状态</p>
                    <p class="two">{{status}}</p>
                </li>
                <li class="one-li">
                    <p class="one">手机号码</p>
                    <p class="two">{{phone}}</p>
                </li>
                <li class="one-li">
                    <p class="one">姓名</p>
                    <p class="two">{{name}}</p>
                </li>
                <li class="one-li">
                    <p class="one">所在公司</p>
                    <p class="two">{{company}}</p>
                </li>
                <li class="one-li">
                    <p class="one">职位</p>
                    <p class="two">{{position}}</p>
                </li>
                <li class="one-li">
                    <p class="one">在职证明</p>
                    <ul class="two-ul">
                        <li class="two-li">
                            <img :src="imgs" />
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
import fly from "@/services/WxApi";
export default {
    data() {
        return {
            status:'',
            phone: "",
            name: "",
            company: "",
            position: "",
            imgs:''
        };
    },
    mounted() {
        let This = this
        fly.post('/contractor/getMySharingPlan').then(function (res) {
            let data = res.response
            if(data.reviewStatus==1){
                This.status='通过'
            }else if(data.reviewStatus==2){
                This.status='不通过'
            }else{
                This.status='审核中...'
            }
            This.phone=data.mobile,
            This.name=data.username,
            This.company=data.companyName,
            This.position=data.positionName,
            This.imgs=data.imgs
        })
    },
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
