<template>
    <div class="container">
        <div class="index" v-if="bottomId">
            <section class="sec-nav">
                <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
            </section>
            <section class="img-contain">
                <swiper1 :cit='cit'></swiper1>
            </section>
            <section class="maintenance" style="margin-bottom:30rpx;">
                <card @city='city'></card>
            </section>
        </div>
        <div class="my" v-if="!bottomId">
            <my :getInfo='getInfo'></my>
        </div>
        <section class="add">
            <bottomNavigationBar :selectNavIndex="selectNavIndex" @indexId='indexFuc' @info='info'></bottomNavigationBar>
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
            bottomId:true,
            getInfo:'',
            boy:'',
            cit:'广东省'
        };
    },
    onShareAppMessage: (res) => {
        console.log(res.id)

    },
    onLoad(options){
        let This = this
    },
    methods:{
        indexFuc(data){
            let This = this
            This.selectNavIndex = data
            if(data==0){
                This.bottomId = true
                console.log('显示主页')
            }else{
                This.bottomId = false
                console.log('显示我的')
            }
        },
        info(data){
            let This = this
            This.getInfo = data
        },
        city(data){
            let This = this
            This.cit = data
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
        width: 100%;
        height: 365rpx;
        margin: 0 auto;
        border-radius: 8rpx;
        margin-top: 40rpx;
        margin-bottom: 36rpx;
        background: #fcfcfc;
        text-align: center;
    }
}
</style>
