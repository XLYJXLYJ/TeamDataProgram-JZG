<template>
    <div class="welcome">
        <goBackNav :title='title' url='/pages/index/main'></goBackNav>
        <p class="about">{{message}}</p>
        <p class="rule" @click="goRule">{{rules}}</p>
        <button style="border:none;" class="confirm" @click="goSharing">{{buttonContent}}</button>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
export default {
    props:['title','message','rules','buttonContent','url'],
    components: {
        goBackNav
    },
    data() {
        return {
     
        }
    },
    mounted() {

    },
    methods: {
        goSharing(){
            let This = this
            wx.redirectTo({
                url:This.url
            });
        },
        goRule(){
            wx.redirectTo({
                url:'/pages/commonMake/main'
            });
        }
    },
}
</script>

<style scoped lang='scss'>
.welcome {
    width: 100%;
    height: 100%;
    .about{
        width: 670rpx;
        margin: 0 auto;
        font-size: 48rpx;
        color:block;
        font-family: 'PingFangSC-Regular';
        margin-top: 96rpx;
    }
    .confirm{
        width: 670rpx;
        height: 96rpx;
        background:#FCB813;
        margin-bottom:24rpx;
        font-size:34rpx;
        font-family:'PingFangSC-Medium';
        position: absolute;
        bottom: 40rpx;
        left: 40rpx;
        font-weight: 650;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rule{
        color:#FCB813;
        width: 670rpx;
        margin-left: 40rpx;
        margin-top: 48rpx;
    }
    button::after{
        border: none;
    }
}
</style>
