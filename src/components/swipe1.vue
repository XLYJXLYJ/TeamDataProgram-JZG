<template>
        <div>
            <swiper
                :indicator-dots="true"
                autoplay
                :interval="3000"
                :duration="1000"
                circular
                indicator-color="rgba(255,255,255,.5)"
                indicator-active-color="#ffffff"
            >
                <block v-for="item in imgUrls" :key="item.id">
                    <swiper-item>
                        <image :src="item.url" class="slide-image" />
                        <text class="text1">{{item.text1}}</text>
                        <text class="text2">{{item.text2}}</text>
                    </swiper-item>
                </block>
            </swiper>
        </div>
</template>

<script>

export default {
    data() {
        return {
            imgUrls: [
                {
                    id: 0,
                    url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
                    text1:'深圳市建筑业优质班组',
                    text2:'查看规则'
                },
                {
                    id: 1,
                    url: "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
                },
                {
                    id: 2,
                    url: "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
                }
            ],
            selectNavIndex:0
        };
    },
};
</script>

<style scoped lang='scss'>
        image {
            width: 670rpx;
            height: 290rpx;
            border-radius: 8rpx;
        }
        .text1{
            width: auto;
            position: absolute;
            top:25%;
            left: 16%;
            font-family: 'PingFang-SC-Heavy';
            font-size: 44rpx;
            font-weight: 550;
        }
        .text2{
            width: auto;
            position: absolute;
            top:55%;
            left: 42%;
            font-family: 'PingFangSC-Regular';
            font-size: 24rpx;
        }
</style>
