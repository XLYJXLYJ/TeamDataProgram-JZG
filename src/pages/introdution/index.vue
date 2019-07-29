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
          <div class="gene active">概况</div>
          <div class="achi">业绩</div>
        </div>
        <div class="basic">
          <div class="basic-sigle"><span class="one">服务地区:</span><span class="two">深圳市河源市武汉市湖南省全省福建省全省</span></div>
          <div class="basic-sigle"><span class="one">主营业务:</span><span class="two">贴砖(装修) 木工 土石方</span></div>
          <div class="basic-sigle"><span class="one">人员规模:</span><span class="two">101-200人</span></div>
          <div class="basic-sigle"><span class="one">联系人:</span><span class="two">洪辉立</span></div>
        </div>
        <div class="work">
          <title>施工报价(9项)</title>
          <p>贴室内墙砖</p>
          <ul>
            <li><span class="one">贴室内地砖</span><span class="two">30.00元/m2</span></li>
            <li><span class="one">电梯楼层内外地砖</span><span class="two">3000.00元/m2</span></li>
            <li><span class="one">小高层贴外墙砖</span><span class="two">300.00元/m2</span></li>
            <li><span class="one">酒店室内贴砖</span><span class="two">30000.00元/m2</span></li>
          </ul>
        </div>
        <div class="equip">
          <p class="self">自有设备(2种)</p>
          <ul>
            <li>
              <p class="machine">三一SY60C-10履带挖掘机</p>
              <div class="img-contain">
                <img @click="previewImage" src="/static/images/mask.png">
                <div class="corner"><div class="img-corner"></div><span class="number">18</span></div>
              </div>
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
.basic{
  width: 670rpx;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 96rpx;
  .basic-sigle{
    display: flex;
    justify-content: space-between;
    .one{
      width: 140rpx;
      font-size: 28rpx;
      color:rgb(159,159,159);
      font-family: 'PingFangSC-Regular';
    }
    .two{
      width: 514rpx;
      font-size: 34rpx;
      color: black;
      font-family: 'PingFangSC-Regular';
      margin-left: 16rpx;
    }
  }
}
.work{
  width: 670rpx;
  height: auto;
  margin: 0 auto;
  margin-top: 100rpx;
  title{
    font-family: 'PingFang-SC-Semibold';
    font-size: 34rpx;
  }
  p{
    font-size: 28rpx;
    color:rgb(159,159,159);
    font-family: 'PingFangSC-Regular';
    margin: 24rpx 0 24rpx 0;

  }
  ul{
    li{
      display: flex;
      justify-content: space-between;
      font-size: 34rpx;
      color: black;
      font-family: 'PingFangSC-Regular';
      margin-bottom: 24rpx;

    }
  }
}
.equip{
  width: 670rpx;
  height: auto;
  margin: 0 auto;
  margin-top: 96rpx;
  .self{
    font-family: 'PingFang-SC-Semibold';
    font-size: 34rpx;
    font-weight: 550;
    margin-bottom: 18rpx;
  }
  ul{
    li{
      .machine{
        font-size: 34rpx;
        color: black;
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
          top: 0rpx;
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
    }
  }
}

</style>
