<template>
    <div class="recommend">
        <goBackNav url='/pages/index/main'></goBackNav>
        <div class="no-recommend" v-if="!list.length">
          <img src="/static/images/none.png">
        </div>
        <div class="content" v-if="list.length">
            <ul>
                 <!-- <li class="card-li" v-for="(item,index) in list" :key="index" @click="goClass(item.contractorId)"> -->
                <li class="card-li" v-for="(item,index) in list" :key="index">
                    <p class="company-name" v-if="item.contractorPrincipal">{{item.contractorPrincipal}}</p>
                    <p class="company-name" v-if="!item.contractorPrincipal"> </p>
                    <span class="status" v-if='item.reviewStatus==3'>审核中</span>
                    <span class="status" v-if='item.reviewStatus==2'>不通过</span>
                    <span class="status" v-if='item.reviewStatus==1'>通过</span>
                    <span class="status" v-if='item.reviewStatus==0'>未注册</span>
                    <span class="time">  {{item.recommendTimeStr}}推荐</span><br/>
                    <span class="cause0">  推荐语: {{item.recommendDesc}}</span>
                    <p class="cause" v-if='item.reviewStatus==2'>原因：{{item.remark}}</p>
                </li>

                
                <!--<li @click="goClass(10462)">
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">    2019年7月13日推荐</span>
                    <br/>
                    <span class="cause0">  推荐语:55656565656565656565656</span>
                    <p class="cause">原因：资料不全</p>
                </li>
                 <li @click="goClass(item.contractorId)">
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">    2019年7月13日推荐</span>
                    <p class="cause">原因：资料不全</p>
                </li>
                <li>
                    <p class="company-name">呼勒浩特好利建筑有限公司</p>
                    <span class="status">审核中</span>
                    <span class="time">    2019年7月13日推荐</span>
                    <p class="cause">原因：资料不全</p>
                </li> -->
            </ul>
        </div>
        <div class="shareButton" @click="goReClass">推荐班组</div>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
import fly from "@/services/WxApi";
export default {
    components: {
        goBackNav
    },
    mounted() {
        this.recommond()
    },
    data(){
        return{
            list:[]
        }
    },
    methods: {
        recommond(){
            let This = this
            wx.showLoading({
                title:'加载中...'
            })
            fly.post('/contractor/getMyRecommendContractor').then(function (res) {
                This.list = res.response
                wx.hideLoading();
            }) 
        },
        goReClass(){
            wx.redirectTo({
                url:'/pages/registerClass/main'
            });
        },
        goClass(index){
            wx.reLaunch({
                url:'/pages/introdution/main?contractorId=' + index
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.recommend {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .no-recommend {
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 128rpx;
            height: 134rpx;
        }
    }
    .shareButton {
        width: 670rpx;
        height: 96rpx;
        font-family: "PingFangSC-Medium";
        font-size: 34rpx;
        background: #FCB813;
        color: black;
        font-weight: 550;
        border: none;
        border-radius: 8rpx;
        flex:0;
        margin: 80rpx auto;
        text-align: center;
        padding: 16rpx 0;
    }
    .shareButton::after {
        border: none;
    }
    .content {
        flex:1;
        ul {
            width: 100%;
            height: auto;
            margin-top: 40rpx;

            li {
                width: 670rpx;
                margin: 0 auto;
                padding: 24rpx 0 24rpx 0;
                border-bottom: 1rpx solid #e5e5e5;
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
                    position: relative;
                    top: 0rpx;
                }
                .cause {
                    font-size: 28rpx;
                    color: #6c6962;
                    font-family: "PingFangSC-Light";
                    position: relative;
                    top: -12rpx;
                }
                .cause0 {
                    font-size: 28rpx;
                    color: #6c6962;
                    font-family: "PingFangSC-Light";
                    position: relative;
                    top: -10rpx;
                    width: 600rpx;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
