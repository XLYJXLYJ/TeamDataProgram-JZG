<template>
    <div class="my">
        <section class="sec-nav">
            <navigation-bar :title="videoTitle" :navBackgroundColor="'white'" :back-visible="true"></navigation-bar>
        </section>
        <section class="maintenance">
            <img  @click="goMy" src="/static/images/user.png">
            <p v-if="mobile">{{name}}</p>
            <p v-if="!mobile" style="font-weight:100;" @click="goLogin" open-type="getUserInfo" @getuserinfo="getUserInfo">点击登陆</p>
        </section>
        <section>
            <ul>
                <li @click="goC" v-if="mobile"><span>我推荐的班组</span><span><img src="/static/images/right.png"></span></li>
                <li @click="goS"><span>共建共享计划</span><span><img src="/static/images/right.png"></span></li>
                <li @click="goW"><span>关于我们</span><span><img src="/static/images/right.png"></span></li>
                <!-- <li v-for="(item,index) in list" :key="index" @click="goUrl(item.url)"><span>{{item.name}}</span><span><img src="/static/images/right.png"></span></li> -->
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
            mobile:'',
            name:'',
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
    mounted() {
        let This = this
        This.mobile = wx.getStorageSync('mobile') 
        This.name = wx.getStorageSync('username')
    },
    methods:{
        goUrl(url){
            wx.navigateTo({
                url
            });
        },
        goMy(){
            wx.navigateTo({
                url:"/pages/editMy/main"
            });
        },
        goLogin(){
            wx.navigateTo({
                url:"/pages/login/main"
            });  
        },
        goC(){
            wx.navigateTo({
                url:"/pages/RecommendedTeams/main"
            }); 
        },
        goS(){
            wx.navigateTo({
                url:"/pages/sharing/main"
            }); 
        },
        goW(){
            wx.navigateTo({
                url:"/pages/aboutUs/main"
            }); 
        },
        getUserInfo (e) {
            console.log(e)
            let userInfo = JSON.parse(e.mp.detail.rawData)
            console.log(userInfo)
            let data = {
                nickName:userInfo.nickName,
                headImg:userInfo.avatarUrl,
                gender:userInfo.gender,
                areaName:[userInfo.country,userInfo.province,userInfo.city]
            }
            fly.post('/contractor/weChatAuth',data).then(function (res) {
                console.log(res)

                if(res.response.mobile){
                    wx.setStorageSync('token', res.response.authorization) 
                    wx.setStorageSync('gender', res.response.gender) 
                    wx.setStorageSync('mobile', res.response.mobile) 
                    wx.setStorageSync('nickName', res.response.nickName) 
                    wx.setStorageSync('username', res.response.username) 
                    wx.navigateTo({
                        url:'/pages/my/main'
                    })
                }else{
                    wx.navigateTo({
                        url:'/pages/point/main'
                    })
                }

            })
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
