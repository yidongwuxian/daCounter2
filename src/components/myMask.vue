<template>
  <div class="mask" v-if="layershow">
    <div class="layermbox">
      <div class="laymshade" @click="laymshadeClose"></div>

      <div class="layermmain">
        <div :class="alert2?'box_alert2':'box'" v-if="type==1">
          <div class="box_text"  v-html="text">
            
          </div>
          <div class="bottom_box">
            <button class="close_btn" @click="close">关闭</button>
            <button class="create_poster_btn" @click="createPoster">生成海报</button>
          </div>
        </div>

        <div class="box2" v-if="type==2">
          <div class="box2_text">{{text}}</div>
          <div class="bottom_box">
            <button class="close_btn" @click="close">关闭</button>
            <button class="create_poster_btn" @click="go()">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowFormatDate } from "../utils/util.js";

export default {
  name: "myMask",

  data() {
    return {
      layershow: false,
      // type: 1,
      text: "",
      id: "",
      type: "1",
      alert2:'',
      fn: ""
    };
  },
  methods: {
    go: function() {
      this.fn();
      this.layershow = false;
    },
    open: function(opt) {
      this.layershow = true;

      this.text = opt.text;
      if (opt.type) {
        this.type = opt.type;
        this.fn = opt.fn;
      } else {
        this.type = "1";
        this.id = opt.id;
      }

      if(opt.alert2){
        this.alert2 = opt.alert2;
      }
    },
    laymshadeClose: function() {},
    close: function() {
      this.layershow = false;
    },
    createPoster: function() {
      var self = this;
      //埋点
      var inserObj = {
        staffNumber: window.localStorage.getItem("userId")
      };
      var inserId = "GeActManaget_test_ActivityAdd_Create PictureClick";

      
      this.$router.push({
        path: "/Poster",
        query: { id: self.id , location: ""}
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layermbox {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.laymshade,
.layermmain {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.laymshade {
  background: rgba(0, 0, 0, 0.3);
}
.layermmain {
  /* display: table; */
  /* pointer-events :none; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 600px;
  height: 430px;
  background: url("../assets/alert.png");
  background-size: 100% 100%;
}
.box_alert2{
  width: 600px;
  height: 430px;
  background: url("../assets/alert2.png");
  background-size: 100% 100%;
}
.box2 {
  width: 600px;
  height: 310px;
  background: #fff;
  background-size: 100% 100%;
  border-radius: 10px;
  text-align: center;
  margin: 0 auto;
}
.box_text {
  margin-top: 166px;
  font-size: 26px;
  padding: 0px 48px;
  height: 80px;
}
.box2_text {
  margin-top: 80px;
  font-size: 26px;
  padding: 0px 48px;
  height: 80px;
}

.bottom_box {
  display: flex;

  padding: 0px 48px;
  margin-top: 48px;
  justify-content: center;
}
.bottom_box button {
  height: 64px;
  width: 220px;

  font-size: 30px;
  border-radius: 10px;
}
.close_btn {
  margin-right: 40px;
  border: 1PX solid #ff5722;
  background: #fff;
  color: #ff5722;
}
.create_poster_btn {
  background: #ff5722;
  color: #fff;
  border: 1PX solid #ff5722;
}
</style>
