<template>
    <div>
        <goBackNav title="共建共享计划" url='/pages/index/main'></goBackNav>
        <div class="share">
            <ul class="one-ul">
                <li class="one-li">
                    <p class="one">加入状态</p>
                    <p class="two">{{status}}<span v-if="status=='审核不通过'">，原因：{{remark}}</span></p>
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
                <li class="one-li" style="display: flex;flex-direction:column;justify-content:space-between;width:100%;">
                    <p class="one" style="margin-left:40rpx;">在职证明</p>
                    <ul class="two-ul" style="margin-left:40rpx;">
                        <li class="two-li" v-for="(item,index) in imgs" :key='index'  @click="PreviewImage(item,imgs)">
                            <img :src="item" />
                        </li>
                    </ul>
                    <p style="color:#FCB813;margin-top:36rpx;margin-left:40rpx;margin-bottom:40rpx" @click="make">建筑业优质班组共建共享计划规则</p>
                    <div>
                        <button style="background-color:#fcb813;border:none;height:96rpx;width:670rpx;margin-bottom:40rpx;margin-top:56rpx;display:flex;align-items:center;justify-content:center;font-weight:650;" v-if="status=='审核不通过'" @click="goshare">再次申请加入</button>
                        <button style="background-color:#fcb813;border:none;height:96rpx;width:670rpx;margin-bottom:40rpx;margin-top:56rpx;display:flex;align-items:center;justify-content:center;font-weight:650;" v-if="status=='未申请'" @click="goshare">申请加入共建共享</button>
                    </div>
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
            imgs:'',
            remark:''
        };
    },
    onShow() {
        let This = this
        fly.post('/contractor/getMySharingPlan').then(function (res) {
            let data = res.response
            wx.setStorageSync('joinSharePlanStatus',data.reviewStatus)
            if(data.reviewStatus==0){
                This.status='未申请'
            }
            else if(data.reviewStatus==1){
                This.status='审核通过'
            }
            else if(data.reviewStatus==2){
                This.status='审核不通过'
            }
            else{
                This.status='审核中'
            }
            This.remark = data.remark
            This.phone=data.mobile || '—',
            This.name=data.username || '—',
            This.company=data.companyName || '—',
            This.position=data.positionName || '—';
            if(data.imgs){
                This.imgs=data.imgs.split(",") || '—'
            }
        })
    },
    methods: {
        PreviewImage(url,arr) {
            wx.previewImage({
                current:url,
                urls: arr
            });
        },
        goshare(){
            wx.redirectTo({
                url:'/pages/repeatRegister/main'
            })
        },
        make(){
            wx.reLaunch({
                url:'/pages/commonMake/main'
            });
        }
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
            height: 168rpx;
            .one {
                font-size: 28rpx;
                color: black;
                font-family: "PingFangSC-Regular";
            }
            .two {
                font-size: 34rpx;
                color: #6c6962;
                font-family: "PingFangSC-Regular";
                margin-top: 18rpx;
            }
            .two-ul {
                .two-li {
                    float: left;
                    margin-right: 32rpx;
                    border-radius: 12rpx;
                    margin-top: 16rpx;
                    img {
                        width: 144rpx;
                        height: 144rpx;
                        border-radius: 12rpx;
                    }
                }
            }
            button::after{
                border:none;
            }
        }
    }
}
</style>
