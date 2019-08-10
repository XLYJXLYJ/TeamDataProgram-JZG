<template>
    <div class="container">
        <div class="index" v-if="bottomId">
            <section class="sec-nav">
                <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
            </section>
            <section class="img-contain">
                <swiper1></swiper1>
            </section>
            <section class="maintenance">
                <card></card>
            </section>
        </div>

        <div class="my" v-if="!bottomId">
            <my></my>
        </div>

        <section class="add">
            <bottomNavigationBar :selectNavIndex="selectNavIndex" @indexId='indexFuc'></bottomNavigationBar>
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
import my from "@/pages/my";
export default {
    components: {
        bottomNavigationBar,
        navigationBar,
        card,
        add,
        swiper1,
        my
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
            selectNavIndex:0,
            bottomId:true 
        };
    },
    onLoad() {
        // wx.clearStorage()
    },
    methods:{
        indexFuc(data){
            let This = this
            console.log(data)
            This.selectNavIndex = data
            if(data==0){
                This.bottomId = true
            }else{
                This.bottomId = false
            }
        }
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
