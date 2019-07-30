<template>
    <div class="register">
        <goBackNav title="申请加入共建共享计划"></goBackNav>
        <div v-if="isAlert">
            <selfAlert
                v-bind:changeModel="ischangeModel"
                v-bind:isModel="ifMode"
                v-bind:val="0"
                @func="controlAlert"
            ></selfAlert>
        </div>
        <div class="contain">
            <form>
                <!-- 第一个表单 -->

                <div class="get-block">
                    <p class="title">班组负责人</p>
                    <input type="text" v-model="name" placeholder="请输入姓名" autocomplete="off" />
                </div>

                <div class="get-block">
                    <p class="title">手机号码</p>
                    <input type="text" v-model="phone" placeholder="请输入您的手机号" autocomplete="off" />
                </div>

                <div class="get-block">
                    <p class="title">班组类别</p>
                    <input
                        type="text"
                        v-model="ClassClassification"
                        placeholder="请输入现在的公司"
                        autocomplete="off"
                        @focus="showMulLinkageTwoPicker"
                    />
                </div>

                <mp-picker
                    ref="mpPicker"
                    :mode="mode"
                    themeColor="rgb(252,184,19)"
                    :deepLength="deepLength"
                    :pickerValueDefault="pickerValueDefault"
                    @onChange="onChange"
                    @onConfirm="onConfirm"
                    @onCancel="onCancel"
                    :pickerValueArray="pickerValueArray"
                ></mp-picker>

                <!-- <div class="img-block">
                <p class="title" style="margin-bottom:20rpx;">在职证明（请提交三种资料之一：1.公司出具的证明函、2.工作证、3.名片）</p>
                <mp-uploader @upLoadSuccess="upLoadSuccess" @upLoadFail="upLoadFail" @uploadDelete="uploadDelete" :showTip=false :count=1></mp-uploader>
                </div>-->
                <div>
                    <button class="confirm">提交</button>
                </div>
                <p class="title">
                    成功推荐新班组，可获得更多权限与资源，详见
                    <span style="color:rgb(252 184 19)">《建筑业优质班组共建共享计划规则》</span>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
import mpPicker from "mpvue-weui/src/picker";
export default {
    components: {
        goBackNav,
        mpPicker
    },

    data() {
        return {
            phone: "",
            phone_code: "",
            name: "",
            company: "",
            position: "",
            btnTxt: "点击获取验证码",
            disabled: false,
            time: 0, // 验证码时间初始化
            btn: true,
            ClassClassification: "班组分类", // 班组分类
            mode: "multiLinkageSelector",
            pickerValueArray: [
                {
                    label: "飞机票",
                    value: 100,
                    children: [
                        {
                            label: "经济舱",
                            value: 101
                        },
                        {
                            label: "商务舱",
                            value: 102
                        }
                    ]
                },
                {
                    label: "火车票",
                    value: 200,
                    children: [
                        {
                            label: "卧铺",
                            value: 210
                        },
                        {
                            label: "坐票",
                            value: 202
                        },
                        {
                            label: "站票",
                            value: 203
                        }
                    ]
                },
                {
                    label: "汽车票",
                    value: 300,
                    children: [
                        {
                            label: "快班",
                            value: 301
                        },
                        {
                            label: "普通",
                            value: 302
                        }
                    ]
                }
            ],
            pickerValueDefault: [1, 0]
        };
    },
    methods: {
        showMulLinkageTwoPicker() {
            this.$refs.mpPicker.show();
        },
        onConfirm(e) {
            console.log(e);
            this.ClassClassification = e.label;
        },
        onChange(e) {
            console.log(e);
        },
        onCancel(e) {
            console.log(e);
        }
    }
};
</script>
<style lang="scss" scoped>
.register {
    width: 100%;
    height: 100%;
    .contain {
        width: 670rpx;
        margin: 0 auto;
        .get-block {
            border-bottom: 1px solid rgb(204, 204, 204);
            margin-bottom: 48rpx;
            .get-code {
                display: flex;
                justify-content: space-between;
            }
        }
        .img-block {
            width: 100%;
            height: 330rpx;
        }
        .title {
            font-size: 28rpx;
            color: block;
            font-family: "PingFangSC-Regular";
            margin-bottom: 16rpx;
        }
        input {
            padding-bottom: 16rpx;
        }
        .confirm {
            background: #fcb813;
            margin-bottom: 24rpx;
            font-size: 34rpx;
            font-family: "PingFangSC-Medium";
        }
    }
}
.getCode {
    color: black;
}
.getCodeDisabled {
    color: rgb(204, 204, 204);
}
</style>
