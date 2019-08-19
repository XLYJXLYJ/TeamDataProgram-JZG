<template>
        <div>
            <swiper
                :indicator-dots="false"
                autoplay
                :interval="3000"
                :duration="1000"
                circular
                indicator-color="rgba(255,255,255,.5)"
                indicator-active-color="#ffffff"
            >
                <block v-for="item in imgUrls" :key="item.id">
                    <swiper-item>
                        <image :src="item.img" class="slide-image" @click="goshare" />
                        <text class="text1">{{cit}}{{item.desc}}</text>
                        <text class="text2">查看详情</text>
                    </swiper-item>
                </block>
            </swiper>
        </div>
</template>

<script>
import fly from "@/services/WxApi";
export default {
    props:['cit'],
    data() {
        return {
            imgUrls:'',
            selectNavIndex:0
        };
    },
    mounted() {
        let This = this
        fly.post('/contractor/getBanner',{bannerType: 200}).then(function (data) {
            This.imgUrls = data.response
        })
    },
    methods: {
        goshare(){
            wx.navigateTo({
                url:'/pages/commonMake/main'
            })
        }
    },
};
</script>

<style scoped lang='scss'>
image {
    width: 100%;
    height: 310rpx;
    border-radius: 8rpx;
}
.text1{
    width: auto;
    position: absolute;
    top:25%;
    left: 16%;
    font-family: 'PingFang-SC-Heavy';
    font-size: 44rpx;
    font-weight: 650;
}
.text2{
    width: auto;
    position: absolute;
    top:65%;
    left: 42%;
    font-family: 'PingFangSC-Regular';
    font-size: 24rpx;
}
</style>
