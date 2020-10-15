<template>
  <div class="container">
    <div class="canvas_box" id="canvas_box">
      <div class="wP100 pT10 pR16 pB10 pL16">
        <!-- crossorigin="anonymous" -->
        <!-- <img src="http://118.24.57.72/image/aaa.jpg"  crossorigin="anonymous" alt class="wP100" id="img_activity" /> -->
        <img
          :src="organizationExtensionData.imgInternetUrl"
          alt
          class="wP100"
          id="img_activity"
          crossorigin="anonymous"
        />
      </div>
      <div class="poster__center pT10 pR16 pB10 pL16">
        <van-row type="flex" justify="space-between">
          <van-col>
            <div class="font28 mL20">
              <div
                class="font38 fontC000000 fontbold"
              >{{(!organizationExtensionData.organizationName)?'暂无名称':organizationExtensionData.organizationName}}</div>
              <div
                class="mT10 fontC455a646"
              >电话：{{(!organizationExtensionData.organizationTel)?'暂无电话':organizationExtensionData.organizationTel}}</div>
              <div
                class="mT10 fontC455a646"
              >地址：{{(!organizationExtensionData.organizationAddress)?'暂无地址':organizationExtensionData.organizationAddress}}</div>
            </div>
          </van-col>
          <van-col>
            <div class="mR20">
              <!-- <img src="@assets/organization/canvas.png" class="w200 h200" alt /> -->
              <img :src="organizationExtensionData.qrInternetUrl" class="w200 h200" alt />
            </div>
          </van-col>
        </van-row>
        <div
          class="font28 pB30"
        >{{(!organizationExtensionData.organizationProfile)?'暂无简介':organizationExtensionData.organizationProfile}}</div>
      </div>
    </div>

    <div class="poster__bottom pT10 pR16 pB10 pL16">
      <van-button type="default" class="submit mT10" block @click="saveImg" >保存海报并分享</van-button>
      <van-uploader
        class="wP100"
        :after-read="afterRead()"
        v-model="organizationExtensionData.imgInternetUrlArr"
        :preview-image="false"
      >
        <van-button type="default" class="submit mT10 wP100" block>更换我的照片</van-button>
      </van-uploader>
      <van-button type="default" class="submit mT10" block @click="edit()">编辑推广文案</van-button>
    </div>
    <van-dialog  v-model="show" show-cancel-button @confirm="confirm()" @close="cancel">
      <van-field
        v-model="organizationExtensionData.organizationProfile"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-dialog>

    <div class="poster">
      <img alt id="imgUrl" :src="canvasURl" />
    </div>


    <van-dialog class="wxdialog" v-model="imgShow" title="" style="width:100%">
      <h1>长按保存图片</h1>
      <img alt :src="canvasURl" class="dialog_img"/>
    </van-dialog>

  </div>
</template>

<script>
import axios from "@/router/axios";
import html2canvas from "html2canvas";
import { putObject } from "@/api/common";
import {
  getOrganizationPopularize,
  updateOrganizationPopularizeById,
} from "@/api/organization";
export default {
  name: "organizationExtension",
  data() {
    return {
      show: false,
      organizationExtensionData: {},
      canvasURl: "",
      tempData:"",
      imgShow:false,
      btnStatus:false,// 保存海报并分享的控制

      // canvas: {}
    };
  },
  created() {
    this.getOrganizationPopularize();
    // this.getQRcode();
  },
  mounted() {
  },
  methods: {
    getQRcode(){
      
      axios({
        method: "get",
        url: "/organization/organizationPromotionCode/getQrcode",
      }).then((res) => {
        if(res.data.resultFlag=="success"){
          location.reload();
        }
      });
    },
    createCanvas() {
      var self = this;
      var img = document.getElementById("img_activity");

      img.onload = function () {
        self.$nextTick(function () {
          // setTimeout(function() {
          var canvas2 = document.createElement("canvas");
          var context = canvas2.getContext("2d");
          window.getPixelRatio = function (context) {
            var backingStore =
              context.backingStorePixelRatio ||
              context.webkitBackingStorePixelRatio ||
              context.mozBackingStorePixelRatio ||
              context.msBackingStorePixelRatio ||
              context.oBackingStorePixelRatio ||
              context.backingStorePixelRatio ||
              1;
            return (window.devicePixelRatio || 1) / backingStore;
          };
          var c = document.getElementById("canvas_box");

          var width = c.offsetWidth; // 获取(原生）dom 宽度
          var height = c.offsetHeight; // 获取(原生）dom 高

          var scaleBy = window.getPixelRatio(context); //获取像素密度的方法 (也可以采用自定义缩放比例)
          canvas2.width = width * scaleBy;
          canvas2.height = height * scaleBy;
          html2canvas(c, {
            allowTaint: true, //
            useCORS: true, // 跨域allowTaint,useCORS这两点很重要
            tainttest: true, //检测每张图片都已经加载完成
            canvas: canvas2,
            scale: scaleBy,
            logging: true,
            // width: width,
            // height: height
          }).then(function (canvas0) {
            try {
              // console.log(canvas0.toDataURL())
              self.btnStatus = true;
              self.canvasURl = canvas0.toDataURL();
            } catch (error) {
              console.log(error);
            }
          });

          // }, 1000);
        });
      };
    },


    isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

    dataURLtoFile(dataURI, type) {
      let binary = atob(dataURI.split(",")[1]);
      let array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    },

    saveImg() {

      if(!this.btnStatus){
        this.$toast("正在加载图片，请稍后再按")
        return false;
      }

      var a = document.createElement("a");
      a.download = "img" + "-" + Math.random()+".png"; //下载的文件名，默认是'下载'
      a.href = this.canvasURl;
      document.body.appendChild(a);
      a.click();
      a.remove();

       if(this.isWeiXin()){
        this.imgShow = true
       }


      let blob = this.dataURLtoFile(this.canvasURl, "image/png");
      let fileOfBlob = new File([blob], new Date() + ".png");
      let formdata = new FormData();

      formdata.append("multipartFile", fileOfBlob);
      axios({
        method: "post",
        url: "/organization/fileOperation/putObject?type=2",
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
        },
        data: formdata,
      }).then((res) => {
        axios({
          method: "post",
          url:
            "/organization/organizationPopularize/updateOrganizationPopularizeById",
          data: {
            id: this.organizationExtensionData.id,
            sharePicId: res.data.body.id,
          },
        }).then((res) => {

        });
      });


    },
    getOrganizationPopularize() {
      getOrganizationPopularize().then((response) => {
        if (response.data.resultFlag == "success") {

          //
          if(!response.data.body.qrCode){
            this.getQRcode();
          }

          if (!response.data.body.imgInternetUrl) {
            response.data.body.imgInternetUrlArr = [];
          } else {
            response.data.body.imgInternetUrlArr = [
              response.data.body.imgInternetUrl,
            ];
          }
          this.organizationExtensionData = response.data.body;

          this.createCanvas();
        }
      });
    },
    edit() {
      this.show = true;
      this.organizationProfile = this.organizationExtensionData.organizationProfile;
      this.tempData = JSON.parse(JSON.stringify(this.organizationExtensionData.organizationProfile));
    },
    cancel(){
      this.organizationExtensionData.organizationProfile = this.tempData
    },
    confirm() {
      updateOrganizationPopularizeById({
        id: this.organizationExtensionData.id,
        organizationProfile: this.organizationExtensionData.organizationProfile,
      }).then((response) => {
        if (response.data.resultFlag == "success") {
            location.reload();
          // this.getOrganizationPopularize();
        }
      });
    },
    afterRead() {
      var self = this;

      return (file) => {

      var M = file.file.size / 1024 / 1024;
      if (file.file.size / 1024 / 1024 > 4) {
        this.$dialog
          .alert({
            title: "图片不允许超过4M", //加上标题
            message: "压缩后可上传，压缩吗", //改变弹出框的内容
            showCancelButton: true, //展示取水按钮
          })
          .then(() => {
            this.compressFile(file.file, this.uploadFn, M / 2);
          })
          .catch(() => {
          });
      } else {
        this.compressFile(file.file, this.uploadFn, 1);
      }
      };
    },


    uploadFn(file) {
        let formdata = new FormData();
        formdata.append("multipartFile", file);
        putObject(formdata).then((response) => {
          if (response.data.resultFlag == "success") {
            updateOrganizationPopularizeById({
              id: this.organizationExtensionData.id,
              organizationImg: response.data.body.id,
            }).then((response) => {
              if (response.data.resultFlag == "success") {
                location.reload();
                // this.getOrganizationPopularize();
              }
            });
          }
        });
    },
    //压缩图片
    compressFile(file, callback, raito) {
      var self = this;
      var Orientation;
      EXIF.getData(file, function () {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, "Orientation");
      });

      let fileObj = file;
      let reader = new FileReader();
      reader.readAsDataURL(fileObj); //转base64
      reader.onload = function (e) {
        var width, height;

        let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result;
        image.onload = function () {
          let canvas = document.createElement("canvas"), // 新建canvas
            context = canvas.getContext("2d"),
            imageWidth = image.width / raito, //压缩后图片的大小
            imageHeight = image.height / raito,
            data = "";

          canvas.width = imageWidth;
          canvas.height = imageHeight;

          width = image.width / raito;
          height = image.height / raito;

          switch (Orientation) {
            case 6:
            case 8:
              canvas.width = height;
              canvas.height = width;
              break;
          }

          var u = navigator.userAgent;
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
          //android处理，ios不处理
          if (Orientation != "" && Orientation != 1 && isAndroid) {
            // alert('旋转处理');
            switch (Orientation) {
              case 6:
                //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                //需要顺时针（向左）90度旋转
                context.rotate(0.5 * Math.PI);
                context.translate(0, -height);
                break;
              case 8:
                //iphone竖屏拍摄，此时home键在上方
                //需要逆时针（向右）90度旋转
                // alert('需要顺时针（向右）90度旋转');
                context.rotate(-0.5 * Math.PI);
                context.translate(-width, 0);
                break;
              case 3: //需要180度旋转
                //iphone横屏拍摄，此时home键在左侧
                context.translate(width, height);
                context.rotate(Math.PI);
                break;
            }
          }

          context.drawImage(image, 0, 0, imageWidth, imageHeight);

          data = canvas.toDataURL("image/jpeg"); // 输出压缩后的base64
          self.base64Img = canvas.toDataURL("image/jpeg");

          let arr = data.split(","),
            mime = arr[0].match(/:(.*?);/)[1], // 转成blob
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          let files = new window.File(
            [new Blob([u8arr], { type: mime })],
            "test.jpeg",
            { type: "image/jpeg" }
          ); // 转成file
          callback(files); // 回调
        };
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.poster {
  height: 1px;
  overflow: hidden;
  // display: none;
  // visibility: hidden;
}

.container /deep/ .wxdialog{
  text-align: center;
  // width: 100%!important;
  // height:80vh;
  overflow: scroll;
  img{
	  width: 100%;
  }
}

// .container /deep/ .van-dialog__content{
//   height:80%;
// }

.dialog_img{
  // width: 600px;
  // height: 600px;
}
</style>
