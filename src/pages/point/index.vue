<template>
    <div class="container">
        <section class="sec-nav">
            <navigationBar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigationBar>
        </section>
        <!-- <alertOk changeModel='true' isModel='true' val=''></alertOk> -->

    </div>
</template>

<script>
// import alertOk from "@/components/alertOk.vue";
import navigationBar from "@/components/navigationBar.vue";
export default {
    components: {
        // alertOk,
        navigationBar
    },
    data() {
        return {
            videoTitle:'建筑业优质班组数据库',
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
