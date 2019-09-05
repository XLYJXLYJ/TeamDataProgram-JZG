<template>
    <div class="agreement">
        <goBackNav title='项目资源专属资源库' :url='url'></goBackNav>
        <div class="contain" style="margin-top:100rpx;">
            『建筑业优质班组数据库』是2018年由上百位广东地区工程项目管理人员自主发起的，优质班组资源“共建共享”计划，旨在搭建一个建筑业同仁一致行动的互信平台。
            <br/>
            1、打造班组良性竞争环境，让优质施工班组的良好信誉与专业水准得以留存和展示，扭转劣币驱逐良币的逆向淘汰机制。
            <br/>
            2、为一线建筑项目管理人员提供一个真实的、有切实使用价值的、使用简单方便的优质班组资源库。
        </div>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
export default {
    components: {
        goBackNav
    },
    data() {
        return {
            url:''
        }
    },
    mounted() {
        let This = this
        This.url = getCurrentPages()
        This.url = This.url[0].__displayReporter.showReferpagepath.split('.')
        This.url = '/' +  This.url[0]
    },
};
</script>
<style lang="scss" scoped>
.agreement {
    position: absolute;
    width: 100%;
    height: 100%;
    .contain {
        width: 670rpx;
        height: auto;
        margin: 0 auto;
    }
    .title {
        font-size: 48rpx;
        color: rgb(51, 51, 51);
        font-family: "PingFangSC-Regular";
        font-weight: 550;
    }
}
</style>
