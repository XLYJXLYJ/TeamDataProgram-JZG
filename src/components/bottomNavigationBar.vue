<template>
    <section class="tabBar-wrap">
        <article class="tabBar-box">
            <ul class="tabBar-nav" v-if="navList.length > 0">
                <li class="item"
                    v-for="(item, index) in navList"
                    @click="selectNavItem(index,item.pagePath)"
                    :key="index">
                    <p class="item-images">
                        <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath"/>
                    </p>
                    <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
                        {{item.text}}
                    </p>
                </li>
            </ul>
        </article>
        <button class="clickButton">加</button>
    </section>
</template>
<script>
export default {
    props: ["selectNavIndex", "needButton", "handButton", "btnText"],
    data() {
        return {
            navList: [
                {
                    selectedIconPath: "/static/tabs/home-active.png",
                    iconPath: "/static/tabs/home.png",
                    pagePath: "../index/main",
                    text: "维保记录"
                },
                {
                    selectedIconPath: "/static/tabs/orders-active.png",
                    iconPath: "/static/tabs/orders.png",
                    pagePath: "../logs/main",
                    text: "我"
                }
            ]
        };
    },
    methods: {
        selectNavItem(index, pagePath) {
            if (index === this.selectNavIndex) {
                return false;
            }
            console.log(index);
            if (index == 0 && this.selectNavIndex == -1) {
                this.$emit("fetchIndex",index);
            }
            this.bindViewTap(pagePath);
        },
        bindNavigateTo(url) {
            wx.navigateTo({
                url
            });
        },
        bindViewTap(url) {
            let page = getCurrentPages();
            console.log(page);

            wx.reLaunch({
                url
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
}

.tabBar-nav {
    width: 100%;
    display: flex;

    .item {
        flex: 1;
        text-align: center;
    }
    .item-text {
        color: #666;
        font-size: 9px;
        transition: 0.24s linear;
    }
    .item-text-active {
        color: #f33f3f;
    }
    .item-images {
        width: 21px;
        height: 21px;
        margin: 4px auto;
        text-align: center;
        transition: 0.24s linear;
        & img {
            display: inline;
        }
    }
}
.clickButton{
    position: fixed;
    bottom: 52rpx;
    left: 327rpx;
    width: 96rpx;
    height: 96rpx;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
    border-radius: 48rpx;
}
</style>