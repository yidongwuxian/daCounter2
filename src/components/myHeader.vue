<template>
  <div class="content_header">
    <!-- 头部 -->
    <div class="header">
      <div v-if="!(this.$route.path=='/home'||this.$route.path=='/login')" v-show="headerShow">
        <span class="back_btn pointer" @click="closeWindow">
          <!-- <span class="back_icon"></span> -->
          <van-icon name="arrow-left" />
        </span>
        <span class="back_font pointer" @click="closeWindow">返回</span>
      </div>
      <p class="header_title font28 fontbold">{{nowRoute}}</p>

      <!-- <span class="setting_btn">
        <div class="setting_query" v-if="page=='query'" @click="query">查询</div>
        <img v-if="page=='share'" class="setting_icon" :src="settingIng" alt @click="shareFri" />
        <div v-else></div>
      </span>-->

      <!-- 弹出框 -->
      <!-- <van-actionsheet v-model="shareShow" :show-confirm-button="false">
        <div class="share_box">
          <div class="share_item" @click="shareMenuFriend">
            <img class="share_img" src="../assets/friend.png" alt />
            <div class="share_text">微信</div>
          </div>
          <div class="share_item" @click="shareMenuTimeline">
            <img class="share_img" src="../assets/timeLine.png" alt />
            <div class="share_text">朋友圈</div>
          </div>
        </div>
        <div>
          <div class="cancel_item" @click="shareCancel">取消</div>
        </div>
      </van-actionsheet>-->
    </div>
  </div>
</template>
<script>
import bus from "../utils/bus.js";
import { getNowFormatDate } from "../utils/util.js";
export default {
  props: {
    // page: {
    //   type: String
    // },
    nowRoute: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 右上角设置栏显示
      // settingDis: true,
      // settingDis: false,
      // 显示设置图标

      // page:'share',
      // settingIng:'',
      settingIng: require("../assets/share.png"),
      shareShow: false,
      headerShow:true
    };
  },
  methods: {
    // 关闭当前页面
    closeWindow: function() {

      if (this.$route.path == "/") {
        // window.ISALES.closeByNative("closeByNative");
      } else if(this.$route.path == "/organizationTrends" || this.$route.path == "/publicWelfareManagement") {
        this.$router.replace("/home")
      }else {
        this.$router.back();
      }
    },

    query: function() {
      this.$router.push({ path: "/Query", query: { location: "" } });
    },
    shareFri: function() {
      //埋点
      this.shareShow = true;
      window.call = function() {
        // console.log("分享成功");
      };
    },
    shareMenuFriend: function() {
      bus.$emit("shareMenuFriend");
    },
    shareMenuTimeline: function() {
      bus.$emit("shareMenuTimeline");
    },
    shareCancel: function() {
      this.shareShow = false;
    }
  },
  mounted() {

    bus.$on("closePage", this.closeSetting);
    
    bus.$on("headerShowClose", ()=>{
      this.headerShow = false
    })
    bus.$on("headerShowOpen", ()=>{
      this.headerShow = true
    })

  },
  watch: {
    // 监视路由
    $route: function(to) {}
  }
};
</script>
<style  scoped lang="scss">
@import "@/styles/variables.scss";

.content_line {
  height: 80px;
}

@media screen and (max-width: 750px) {
  .header {
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 80px;
    background-color: $Cffffff;
  }
}

@media screen and (min-width: 750px) {
  .header {
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 80px;
    background-color: $Cffffff;
  }
}

/* .header  */
.back_btn {
  position: absolute;
  left: 20px;
  top: 50%;
  margin-top: -20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
}
.back_icon {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -15px;
  width: 19px;
  height: 35px;
  margin-left: 30px;
  background: url("../assets/back.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.back_font {
  position: absolute;
  top: 50%;
  margin-top: -20px;
  left: 70px;
  font-size: 30px;
}
.header_title {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 80px;
  border-bottom: 1px solid #ebedf0;
}
.setting_btn {
  position: absolute;
  right: 0;
  top: 40%;

  /* -webkit-transform: translate(0, 50); */
  /* transform: translate(0, -50%); */

  margin-top: -42px;
  width: 80px;
  height: 80px;
  z-index: 2;
}
.setting_icon {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -17px;
  width: 34px;
  height: 34px;
  margin-right: 40px;
  /* background: url("../assets/setting.png"); */
  background-repeat: no-repeat;
  background-size: contain;
}
.setting_query {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -14px;
  width: 80px;
  height: 34px;
  margin-right: 20px;
  font-size: 34px;
  color: white;
}

.share_box {
  display: flex;
  height: 160px;

  /* justify-content: center; */
  text-align: center;
  /* align-items: center; */
}

.share_box img {
  width: 50px;
  height: 50px;
}

.share_item {
  height: 160px;
  flex: 1;
  border: 1px solid #eee;
  border-radius: 5px;
  font-size: 28px;
  padding: 30px 0px;
}

.cancel_item {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 30px;
}
.share_text {
  font-size: 24px;
}
</style>
