<template>
	<div class="container">
		<van-cell title="头像" center>
			<template #right-icon>
				<van-uploader
					:after-read="afterRead"

					:before-read="beforeRead"
					v-model="userInfo.imgInternetUrlArr"
					:preview-image="false"
				>
					<van-image round width="1.5rem" height="1.5rem" :src="userInfo.accessoryUrl"/>
				</van-uploader>
				<van-icon
					name="arrow"
					class="van-cell__right-icon"
					style="font-size: 16px; line-height: inherit;"
				/>
			</template>
		</van-cell>
		<van-cell title="用户名" :value="userInfo.username"/>
		<van-cell title="手机号" is-link :value="userInfo.phone" to="changePhone"/>
		<van-cell title="账号密码" is-link value="修改账号密码" to="changePassword"/>
		<van-cell title="微信号" is-link value="修改微信号" @click="goto"/>
		<!-- <van-cell title="注销账号" is-link value="内容" to="index" /> -->
		<van-button block class="fontCe10808 mT40" @click="fedLogOut()">退出当前账号</van-button>
		<van-dialog v-model="show" show-cancel-button @confirm="confirm()">
			<van-row type="flex" justify="center" class="mT50 mB20 font28 fontbold">即将退出养老通管理后台</van-row>
			<van-row type="flex" justify="center" class="mT10 mB40 font24">是否继续退出登录？</van-row>
		</van-dialog>
	</div>
</template>

<script>
import axios from "@/router/axios";
import { putObject } from "@/api/common";
import { getUserInfo, updateSysUser } from "@/api/account";
export default {
  name: "myAccount",
  data() {
    return {
      userInfo: {},
      show: false
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    goto() {
      //  this.$router.push('/boundWexin');
      this.$router.push({ path: "/boundWexin", query: { type: "update" } });
    },
    getUserInfo() {
      getUserInfo().then(response => {
        if (response.data.resultFlag == "success") {
          this.userInfo = response.data.body.sysUser;
        }
      });
    },
    fedLogOut() {
      this.show = true;
    },
    confirm() {
      this.$store
        .dispatch("FedLogOut")
        .then(response => {
          this.$router.push({
            path: "/login"
          });
        })
        .catch(err => {});
    },

    // afterRead() {
    //   var self = this;

    //   return file => {
    //     let formdata = new FormData();
    //     formdata.append("multipartFile", file.file);
    //     putObject(formdata).then(response => {
    //       if (response.data.resultFlag == "success") {
    //         console.log(response);
    //         updateSysUser({
    //           accessoryId: response.data.body.id
    //         }).then(response => {
    //           if (response.data.resultFlag == "success") {
    //             this.getUserInfo();
    //           }
    //         });
    //       }
    //     });
    //   };
    // }


    beforeRead(file) {
      this.loading = this.$loading({
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return file;
    },

    afterRead(file) {
      var M = file.file.size / 1024 / 1024;
      if (file.file.size / 1024 / 1024 > 4) {
        this.$dialog
          .alert({
            title: "图片不允许超过4M", //加上标题
            message: "压缩后可上传，压缩吗", //改变弹出框的内容
            showCancelButton: true //展示取水按钮
          })
          .then(() => {
            this.compressFile(file.file, this.uploadFn, M / 2);
          })
          .catch(() => {
            this.loading.close();
            // this.form.picture2 = [];
          });
      } else {
        this.compressFile(file.file, this.uploadFn, 1);
        // this.uploadFn(file.file);
      }
    },

    compressFile(file, callback, raito) {
      var self = this;
      var Orientation;
      EXIF.getData(file, function() {
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, "Orientation");
      });

      let fileObj = file;
      let reader = new FileReader();
      reader.readAsDataURL(fileObj); //转base64
      reader.onload = function(e) {
        var width, height;

        let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result;
        image.onload = function() {
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

          var ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var iosGo = false;
          if (ver) {
            //13.5不旋转，13.5以下选转
            if (parseInt(ver[2]) < 5) {
              iosGo = true;
            }
          }

          var u = navigator.userAgent;
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
          //android处理，ios不处理
          if (Orientation != "" && Orientation != 1 && (isAndroid || iosGo)) {
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

    uploadFn(file) {
      var self = this;
      let formdata = new FormData();
      formdata.append("multipartFile", file);
      axios({
        method: "post",
        url: "/organization/fileOperation/putObject?type=2",
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8"
        },
        data: formdata
      }).then(res => {
        axios({
          method: "post",
          url: "/user/user/updateSysUser",
          data: {
            accessoryId: res.data.body.id
          }
        }).then(res2 => {
		self.loading.close();
          if (res2.data.resultFlag == "success") {
            this.getUserInfo();
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.FedLogOut {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
