<template>
    <div class="container">
        <!-- <section class="sec-nav">
            <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
        </section>
        <section class="img-contain">
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
                    </swiper-item>
                </block>
            </swiper>
        </section>
        <section class="maintenance">
            <p class="record">维保记录</p>
            <card></card>
        </section>
        <section class="add">
            <bottomNavigationBar :selectNavIndex="selectNavIndex"></bottomNavigationBar>
        </section>-->
        <web-view src="http://www.manongjc.com/article/72190.html"></web-view>
    </div>
</template>

<script>
import navigationBar from "@/components/navigationBar.vue";
import bottomNavigationBar from "@/components/bottomNavigationBar.vue";
import card from "@/components/card.vue";
import add from "@/components/add.vue";
export default {
    components: {
        bottomNavigationBar,
        navigationBar,
        card,
        add
    },
    data() {
        return {
            imgUrls: [
                {
                    id: 0,
                    url:
                        "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640"
                },
                {
                    id: 1,
                    url:
                        "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
                },
                {
                    id: 2,
                    url:
                        "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
                }
            ],
            selectNavIndex: 1
        };
    },
    methods: {}
};
</script>

<style scoped lang='scss'>
.container {
    width: 100%;
    height: 100%;
    .title {
        display: block;
        width: 100%;
        height: 128rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .img-contain {
        display: block;
        width: 670rpx;
        height: 290rpx;
        margin: 0 auto;
        border-radius: 8rpx;
        margin-top: 40rpx;
        image {
            width: 670rpx;
            height: 290rpx;
            border-radius: 8rpx;
        }
    }
    .maintenance {
        .record {
            width: 200rpx;
            height: 44rpx;
            font-size: 34rpx;
            color: black;
            font-family: "PingFangSC-Medium";
            font-weight: 550;
            padding: 64rpx 0 24rpx 40rpx;
        }
    }
}
</style>
