<template>
    <div class="my">
        <section class="sec-nav">
            <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
        </section>
        <section class="maintenance">
            <img src="/static/images/mask.png">
            <p>赵小龙</p>
        </section>
        <section>
            <ul>
                <li><span>我推荐的班组</span><span><img src="/static/images/right.png"></span></li>
                <li><span>共建共享计划</span><span><img src="/static/images/right.png"></span></li>
                <li><span>关于我们</span><span><img src="/static/images/right.png"></span></li>
            </ul>
        </section>
        <section class="add">
            <bottomNavigationBar :selectNavIndex="selectNavIndex"></bottomNavigationBar>
        </section>
    </div>
</template>

<script>
import navigationBar from "@/components/navigationBar.vue";
import bottomNavigationBar from "@/components/bottomNavigationBar.vue";
export default {
    components: {
        bottomNavigationBar,
        navigationBar,
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
            selectNavIndex:1
        };
    },
    mounted() {
    },
    methods:{

    }
};
</script>

<style scoped lang='scss'>
.my {
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
    .maintenance{
        width: 690rpx;
        height: 316rpx;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img{
            width: 120rpx;
            height: 120rpx;
            border-radius: 60rpx;
        }
        p{
            margin-top: 28rpx;
            font-size: 34rpx;
            font-weight: bold;
            color: rgb(51, 51, 51);
        }
    }
    ul{
        width: 100%;
        height: 100%;
        margin-top: 96rpx;
        li{
            width:670rpx;
            height: 104rpx;
            margin:0 auto;
            display:flex;
            justify-content:space-between;
            align-items: center;
            border-bottom: 1rpx solid rgb(204, 204, 204);
            font-family: 'PingFangSC-Regular';
            img{
                height: 25.2rpx;
                width: 16rpx;
            }
        }
    }
}
</style>
