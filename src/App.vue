<template>
  <div id="app">
    <div class="middle-panel mescroll-touch">
      <myHeader :page="page" :nowRoute="nowRoute"></myHeader>
      <div class="blank"></div>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
import myHeader from "./components/myHeader.vue";
import bus from "./utils/bus.js";
export default {
  components: { myHeader },
  name: "app",

  data() {
    return {
      page: "", //特别标识，具体含义看myHeader
      nowRoute: "" //title
    };
  },
  watch: {
    $route: "routeChange"
  },
  methods: {
    routeChange: function() {
      if (this.$route.name) {
        if (this.$route.name.indexOf("?") != "-1") {
          this.nowRoute = this.$route.name.split("?")[0];
          this.page = this.$route.name.split("?")[1];
        } else {
          this.nowRoute = this.$route.name;
          this.page = "";
        }
      }
    }
  },
  mounted() {

    if (this.$route.name) {
      if (this.$route.name.indexOf("?") != "-1") {
        this.nowRoute = this.$route.name.split("?")[0];
        this.page = this.$route.name.split("?")[1];
      } else {
        this.nowRoute = this.$route.name;
        this.page = "";
      }
    }
  }
};
</script>

<style>
@import "./assets/reset.css";
#app {
  width: 100%;
  height: 100%;
  background: #fff;
}

.middle-panel {
  /* max-width: 750px; */
  margin: 0 auto;
}

input,
button,
select,
textarea {
  outline: none;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.blank {
  height: 80px;
}

/* 一些全局样式 由于scope限制 写在这里 */
.action_class {
  height: 100px !important;
  line-height: 100px !important;
  color: #666;
}
/* .van-dialog{
  font-size: 40px!important;
  height: 210px;
}  */
/* .van-dialog__content{
  height: 150px;
} */
.tempSaveShow {
  font-size: 36px !important;
}
/* .van-dialog__footer{
  height: 70px;
} */
/* .van-button{
  font-size: 32px!important;
} */

/* .van-dialog__confirm,.van-dialog__cancel{
  height: 100px!important;
} */

/* .van-actionsheet__header{
  height: 70px;
  line-height: 70px!important;
}

.van-picker__toolbar{
    height: 80px!important;
     line-height: 80px!important;
}

.van-actionsheet__item{
 font-size: 32px!important;
} */

/*修改 vant css*/

.van-toast {
  /* font-size: 36px!important;  */
  /* height: 100px;
  width: 80% !important; */
  /* line-height:42px!important; */
}
.van-toast--default {
  width: 300px !important;
}
.van-dialog {
  width: 80% !important;
  /* height:100vh!important; */
}
</style>
