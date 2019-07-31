<template>
    <div class="container">
        <section class="sec-nav">
            <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
        </section>
        <section class="img-contain">
            <swiper1></swiper1>
        </section>
        <section class="maintenance">
            <card></card>
        </section>
        <section class="add">
            <bottomNavigationBar :selectNavIndex="selectNavIndex"></bottomNavigationBar>
        </section>
    </div>
</template>

<script>
import navigationBar from "@/components/navigationBar.vue";
import bottomNavigationBar from "@/components/bottomNavigationBar.vue";
import swiper1 from "@/components/swipe1.vue";
import card from "@/components/card.vue";
import add from "@/components/add.vue";
import fly from "@/services/WxApi";
export default {
    components: {
        bottomNavigationBar,
        navigationBar,
        card,
        add,
        swiper1
    },
    data() {
        return {
            imgUrls: [
                {
                    id: 0,
                    url: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640"
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
    mounted() {
        // fly.post('',{key: '6758fab29abe7d27e2a91d7b0d76c7dc'}).then(function (response) {
        //     console.log(response);
        // })
    },
    methods:{
    }
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
    }
}
</style>
