<template>
    <div class="my">
        <section class="sec-nav">
            <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
        </section>
        <!-- <section class="maintenance">
            <div v-if="!getInfo">
                <img  @click="goMy" :src="aImg">
                <p v-if="mobile">{{name}}</p>
                <p v-if="!mobile" style="font-weight:100;color:rgb(252, 184, 19);" @click="goLogin">点击登录1</p>
            </div>
            <div v-if="getInfo">
                <img @click="goMy" :src="getInfo.headImg">
                <p v-if="getInfo.mobile">{{getInfo.username}}</p>
                <p v-if="!getInfo.mobile" style="font-weight:100;color:rgb(252, 184, 19);" @click="goLogin">点击登录2</p>
                <p>{{test}}</p>
            </div>
        </section> -->

        <section class="maintenance">
            <div v-if="!userInfo">
                <img  @click="goMy" :src="aImg" v-if="aImg">
                <img  @click="goMy" src="/static/images/user.png" v-if="!aImg">
                <p v-if="mobile">{{name}}</p>
                <p v-if="!mobile" style="font-weight:100;color:rgb(252, 184, 19);" @click="goLogin">点击登录</p>
            </div>
            <div v-if="userInfo">
                <img @click="goMy" :src="userInfo.headImg" v-if="userInfo.headImg">
                <img @click="goMy" src="/static/images/user.png" v-if="!userInfo.headImg">
                <p v-if="userInfo.mobile">{{userInfo.username}}</p>
                <p v-if="!userInfo.mobile" style="font-weight:100;color:rgb(252, 184, 19);" @click="goLogin">点击登录</p>
            </div>
            <!-- <p>{{userInfo.username}}</p>
              <p>2222</p> -->
        </section>


        <section>
            <ul>
                <li @click="goC" v-if="joinSharePlanStatus==1 | getInfo.joinSharePlanStatus==1"><span>我推荐的班组</span><span><img src="/static/images/right.png"></span></li>
                <li @click="goS"><span>共建共享计划</span><span><img src="/static/images/right.png"></span></li>
                <li @click="goW"><span>关于我们</span><span><img src="/static/images/right.png"></span></li>
                <!-- <li v-for="(item,index) in list" :key="index" @click="goUrl(item.url)"><span>{{item.name}}</span><span><img src="/static/images/right.png"></span></li> -->
            </ul>
        </section>
        <!-- <section class="add">
            <bottomNavigationBar :selectNavIndex="selectNavIndex"></bottomNavigationBar>
        </section> -->
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import {  USER_INFO } from '../../store/modules/mutation-type'
import navigationBar from "@/components/navigationBar.vue";
import bottomNavigationBar from "@/components/bottomNavigationBar.vue";
export default {
    components: {
        bottomNavigationBar,
        navigationBar,
    },
    props: ["getInfo"],
    data() {
        return {
            mobile:'',
            name:'',
            aImg:'',
            joinSharePlanStatus:wx.getStorageSync('joinSharePlanStatus') || '',
            list: [
                {
                    id: 0,
                    name:'我推荐的班组',
                    url: "/pages/RecommendedTeams/main"
                },
                {
                    id: 1,
                    name:'共建共享计划',
                    url: "/pages/sharing/main"
                },
                {
                    id: 2,
                    name:'关于我们',
                    url: "/pages/aboutUs/main"
                }
            ],
            selectNavIndex:1
        };
    },
    computed: {
        ...mapState([
            'userInfo'
        ])
    },
    onShow() {
        let This = this
        console.log('getinfo66666')
        console.log(This.getInfo)
        console.log(This.$store.state.userInfo)
        console.log('This.userInfo')
        console.log(This.userInfo)


        This.mobile = wx.getStorageSync('mobile')
        This.name = wx.getStorageSync('username')
            // This.aImg = wx.getStorageSync('img')
        This.joinSharePlanStatus = wx.getStorageSync('joinSharePlanStatus')
        console.log(This.joinSharePlanStatus)
        if(wx.getStorageSync('img')){
            let img = wx.getStorageSync('img')
            if(img.indexOf('wx.qlogo.cn')>0){
                console.log('默认灰色头像')
                This.aImg = '/static/images/user.png'
            }else{
                console.log('哈哈哈')
                This.aImg = wx.getStorageSync('img')
            }

        }else{
            This.aImg = '/static/images/user.png'
        }
    },
    // onshow(){
    //     let This = this
    //     console.log('getinfo')
    //     console.log(This.getInfo)
    //     This.mobile = wx.getStorageSync('mobile')
    //     This.name = wx.getStorageSync('username')
    //     This.joinSharePlanStatus = wx.getStorageSync('joinSharePlanStatus')
    //     if(wx.getStorageSync('img')){
    //         let img = wx.getStorageSync('img')
    //         if(img.indexOf('wx.qlogo.cn')>0){
    //             This.aImg = '/static/images/user.png'
    //         }else{
    //             This.aImg = wx.getStorageSync('img')
    //         }

    //     }else{
    //         This.aImg = '/static/images/user.png'
    //     } 
    // },
    methods:{
        ...mapMutations([
            USER_INFO
        ]),
        // test(data1){
        //     let This = this
        //     This[USER_INFO](data1)
        // },
        goUrl(url){
            wx.reLaunch({
                url
            });
        },
        goMy(){
            if(wx.getStorageSync('mobile')){
                wx.reLaunch({
                    url:"/pages/editMy/main"
                });
            }else{
                wx.reLaunch({
                    url:"/pages/login/main"
                });
            }

        },
        goLogin(){
            wx.reLaunch({
                url:"/pages/login/main"
            });  
        },
        goC(){
            wx.reLaunch({
                url:"/pages/RecommendedTeams/main"
            }); 
        },
        goS(){
            console.log('55555555')
            console.log(!wx.getStorageSync('mobile'))
            let This = this
            console.log(This.joinSharePlanStatus)
            if(!wx.getStorageSync('mobile') || This.joinSharePlanStatus == 0){
                wx.reLaunch({
                    url:"/pages/welcome/main"
                }); 
            }else{
                wx.reLaunch({
                    url:"/pages/sharing/main"
                }); 
            }
        },
        goW(){
            console.log('666666666')
            wx.reLaunch({
                url:"/pages/aboutUs/main"
            }); 
        }
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
            text-align: center;
            margin: 0 auto;
            display: flex;
            justify-content: center;
        }
        p{
            margin-top: 38rpx;
            font-size: 34rpx;
            font-weight: bold;
            color: rgb(51, 51, 51);
            text-align: center;
            margin: 3rpx auto;
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
            border-bottom: 1rpx solid #e5e5e5;
            font-family: 'PingFangSC-Regular';
            img{
                height: 25.2rpx;
                width: 16rpx;
            }
        }
    }
}
</style>
