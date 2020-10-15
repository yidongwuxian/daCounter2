<template>
  <div class="container">
    <!-- <div id="allmap"></div> -->

    <img src="http://118.24.57.72/image/aaa.jpg" style="width:100px;height:100px" alt="">

  </div>
</template>
<script>
import axios from "axios";

import E from "wangeditor";
// import BMap from 'BMap';
// import BMap from 'BMap'
export default {
  name: "",
  data() {
    return {
      editorContent: ""
    };
  },
  mounted() {
    // var editor = new E(this.$refs.editor)
    // editor.customConfig.onchange = (html) => {
    //   this.editorContent = html
    // }

    // editor.create()

    // 百度地图API功能
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(
      new BMap.MapTypeControl({
        mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
      })
    );

    function showInfo(e) {
      alert(1)
      // self.form.latitude = e.point.lat;
      // self.form.longitude = e.point.lng;
      // alert("已获取经度:" + e.point.lng + ",纬度:" + e.point.lat);
    }
    map.addEventListener("click", showInfo);

    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    // var E = window.wangEditor
    // var editor = new E('#editor')
    // // 或者 var editor = new E( document.getElementById('editor') )
    // editor.create()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#allmap {
  width: 500px;
  height: 500px;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
</style>
