<template>
    <div>
        <goBackNav></goBackNav>
        <div v-if="isAlert">
          <selfAlert v-bind:changeModel='ischangeModel' v-bind:isModel='ifMode' v-bind:val='0' @func='controlAlert'></selfAlert>
        </div>

        <div>
            <div class="img-head">
                <img src="/static/images/mask.png">
            </div>
            <div class="title">吉峰机械工程有限公司</div>
            <div class="tag">
                <ul class="text-ul">
                    <li class="text-li">挖填方 * 6</li>
                    <li class="text-li">运输队 * 9</li>
                </ul>
            </div>
            <div class="detail">
              <p class="one">"该班组技术好，态度好，做事负责"</p>
              <p class="two">推荐人：张三 项目经理</p>
              <p class="three">深圳市新丰建筑工程有限公司</p>
            </div>
            <div class="brief">
              成立于 1998 年，总部位于深圳市福田区，曾多次获得深圳市政府颁发的工程质量奖项，团队规模在 500 人以上，拥有专业的设备。欢迎来电洽谈业务。
            </div>
            <button class="phone" @click="seePhone">查看联系方式</button>
        </div>
        <div class="tab">
          <div class="gene">概况</div>
          <div class="achi active">业绩</div>
        </div>
        <div class="equip">
          <p class="self">自有设备(2种)</p>
          <ul class="one-ul">
            <li class="one-li">
              <p class="machine">三一SY60C-10履带挖掘机</p>
              <div class="img-contain">
                <img @click="previewImage" src="/static/images/mask.png">
                <img @click="previewImage" src="/static/images/mask.png">
                <img @click="previewImage" src="/static/images/mask.png">
                <img @click="previewImage" src="/static/images/mask.png">
                <img @click="previewImage" src="/static/images/mask.png">
                <img @click="previewImage" src="/static/images/mask.png">
                <div class="corner"><div class="img-corner"></div><span class="number">18</span></div>
              </div>
              <ul class="two-ul">
                <li><div class="one"></div><div class="two">挖填方</div></li>
                <li><div class="one"></div><div class="two">2015 年 5 月开工</div></li>
                <li><div class="one"></div><div class="two">建筑工程鲁班奖</div></li>
                <li><div class="one"></div><div class="two">业主：深圳市兴河建设工程公司</div></li>
                <li><div class="one"></div><div class="two">工程量：70340 吨。工程亮点：混凝土二次浇筑部位钢筋绑扎质量好，没有出现任何变形现象，钢筋最大直径为 ф50。</div></li>
              </ul>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import goBackNav from "@/components/goBackNav.vue";
import selfAlert from "@/components/alert.vue";
export default {
  data(){
    return{
      ifMode:false,
      ischangeModel:false,
      isAlert:false
    }
  },

    methods: {
      previewImage(){
        wx.previewImage({
          current: 'http://test.guest.qb-tech.net/QbBotCmsService/img/aimi-big.png', // 当前显示图片的http链接  
          urls: ['http://test.guest.qb-tech.net/QbBotCmsService/img/aimi-big.png'] // 需要预览的图片http链接列表  
        })
      },
      controlAlert(data){
        console.log(data)
        this.isAlert = data
      },
      seePhone(){
        this.ifMode = true,
        this.ischangeModel = true
        this.isAlert = true
      }
    },
    components: {
        goBackNav,
        selfAlert
    }
};
</script>
<style lang="scss" scoped>
.img-head{
  height: 400rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 240rpx;
    height: 240rpx;
  }
}
.title{
  font-family: 'PingFangSC-Regular';
  font-size: 52rpx;
  text-align: center;
  margin: 16rpx 0 16rpx 0;
}
.tag{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .text-ul{
      list-style: none;
      .text-li{
          float: left;
          height: 40rpx;
          width: auto;
          background-color: rgba(252, 184, 19,.2);
          font-family: 'PingFangSC-Regular';
          font-size: 24rpx;
          color: rgb(202, 146, 9);
          display: flex;
          align-items: center;
          margin-right: 10rpx;
          padding: 0rpx 10rpx 0 10rpx;
          margin: 6rpx;
      }
  }
}
.detail{
  width: 670rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 48rpx;
  padding: 24rpx 0 24rpx 0;
  .one{
    font-size: 34rpx;
    color: black;
    font-family: 'PingFangSC-Regular';
    text-align: center;
  }
  .two{
    font-size: 28rpx;
    color:#5c5a54;
    font-family: 'PingFangSC-Regular';
    text-align: center;
  }
  .three{
    font-size: 28rpx;
    color:#5c5a54;
    font-family: 'PingFangSC-Regular';
    text-align: center;
  }
}
.brief{
    width: 670rpx;
    font-size: 34rpx;
    color: black;
    font-family: 'PingFangSC-Regular';
    margin: 0 auto;
    display: flex;
    text-align: center;
    margin-top: 48rpx;
}
.phone{
  width: 360rpx;
  height: 96rpx;
  background: rgb(252, 184, 19);
  font-size: 34rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 96rpx;
}
.tab{
  display: flex;
  justify-content: space-around;
  margin-top: 96rpx;
  .gene{
    width: 50%;
    text-align: center;
    padding-bottom: 24rpx;
    font-family: 'PingFang-SC-Semibold';
  }
  .achi{
    width: 50%;
    text-align: center;
    padding-bottom: 24rpx;
    font-family: 'PingFang-SC-Semibold';
  }
  .active{
    border-bottom: 6rpx solid rgb(252, 184, 19);
  }
}
.equip{
  width: 670rpx;
  height: auto;
  margin: 0 auto;
  margin-top: 96rpx;
  .self{
    font-family: 'PingFang-SC-Semibold';
    font-size: 36rpx;
    font-weight: 550;
    margin-bottom: 18rpx;
  }
  .one-ul{
    .one-li{
      .machine{
        font-size: 30rpx;
        color: rgb(252,184,19);
        font-family: 'PingFangSC-Regular';
        margin-bottom: 24rpx;
        z-index: 0;
      }
      .img-contain{
        position: relative;
        img{
          width: 222rpx;
          height: 222rpx;
          border-right: 3rpx solid #fff;
        }
        .corner{
          position: absolute;
          right: 0rpx;
          bottom: 20rpx;
          background: rgba(0, 0, 0, .4);
          padding: 0rpx 10rpx 0rpx 10rpx;
          .img-corner{
            background-image: url('/static/images/back.png') no-repeat;
            display: inline-block;
            width: 36rpx;
            height: 28rpx;
            background: red;
          }
          .number{
              font-size: 30rpx;
              color:white;
              font-family: 'PingFangSC-Regular';
          }
        }
      }
      .two-ul{
        li{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .one{
            width: 32rpx;
            height: 32rpx;
            background: red;
            display: inline-block;
            margin-top: 6rpx;
          }
          .two{
            width: 618rpx;
            display: inline-block;
            font-size: 30rpx;
            color:black;
            font-family: 'PingFangSC-Regular';
          }
        }
      }
    }
  }
}

</style>
