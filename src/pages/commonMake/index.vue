<template>
    <div class="agreement">
        <goBackNav title :url='url'></goBackNav>
        <div class="contain">
            <p class="title">建筑业优质班组共建共享计划规则</p>
            <br/>
            <br/>
            <span>
                1、实名制，所有申请使用本库的项目管理人员，后台都将多手段审核申请人真实身份，个别难以辨别的将采用线下走访方式审核；
                <br/>
                <br/>
                2、共建共享，用户每成功推荐一位优班组入库，都会获得查询100个班组联系方式的权限；
                <br/>
                <br/>
                3、真实优质，班组入库规则，每位被推荐的班组，后台都将多角度进行相关资历验证和历史业绩核实，必要时进行面谈，通过审核入库，确认推荐成功；
                <br/>
                <br/>
                4、可上可下，所有优质班组数据采取重大投诉零容忍制，重大投诉一旦得到证实，该班组数据将被删除，并进入黑名单。
            </span>
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
        console.log(This.url)
        This.url = This.url[0].__displayReporter.showReferpagepath.split('.')
        This.url = '/' +  This.url[0]
        console.log(This.url)
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
