<template>
  <div class="container publicWelfareManagementAdd">
    <van-form>
      <van-cell-group>
        <van-field
          v-model="form.title"
          label="活动标题"
          placeholder="请输入"
          input-align="right"
          :rules="[{ required: true, message: '请填写标题' }]"
        />
      </van-cell-group>

      <van-cell-group>
        <van-field v-model="form.contacts" label="联系人" placeholder="请输入" input-align="right" />
      </van-cell-group>

      <van-cell-group>
        <van-field v-model="form.contactNumber" label="联系电话" placeholder="请输入" input-align="right" />
      </van-cell-group>

      <van-row type="flex" justify="space-between" class="padding-base">
        <van-col>
          <span class="van-cell__title van-field__label fontP14">图片</span>
        </van-col>
        <van-col>
          <van-uploader
            v-model="form.picture2"
            :before-read="beforeRead"
            :after-read="afterRead"
            @delete="delete1"
            :max-count="1"
          />
        </van-col>
      </van-row>
      <!-- <div style="padding:10px">
      <span style="font-size:14px;margin:20px 150px 0 10px;vertical-align: top;color: #646566;">图片</span>
      <van-uploader
        v-model="form.picture2"
        :after-read="afterRead"
        @delete="delete1"
        :max-count="1"
      />
      </div>-->

      <van-cell-group>
        <van-field
          v-model="form.contentValidity"
          label="活动简介"
          placeholder="请输入"
          input-align="right"
        />
      </van-cell-group>

      <van-cell-group>
        <van-field readonly label="活动内容" placeholder input-align="right" />
      </van-cell-group>
      <div ref="editor" style="text-align:left"></div>
    </van-form>

    <van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16" v-if="state==0">
      <van-col class="mR20">
        <van-button type="default" size="small" @click="submit(0)" :disabled="btnStatus" class="submit">保存</van-button>
      </van-col>
      <van-col class>
        <van-button type="default" size="small" @click="submit(1)" :disabled="btnStatus" class="submit">提交</van-button>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="pT20 pR16 pB20 pL16" v-if="state==1">
      <van-col class="mR20">
        <van-button type="default" size="small" @click="update(0)" :disabled="btnStatus" class="submit">保存</van-button>
      </van-col>
      <van-col class>
        <van-button type="default" size="small" @click="update(1)" :disabled="btnStatus" class="submit">提交</van-button>
      </van-col>
    </van-row>
    <!-- <div class="panel__bottom" v-if="state==0">
			<van-button type="default" @click="submit(0)" class="submit">保存</van-button>&nbsp;&nbsp;
			<van-button type="default" @click="submit(1)" class="submit">提交</van-button>
		</div>
		<div class="panel__bottom" v-if="state==1">
			<van-button type="default" @click="update(0)" class="submit">保存</van-button>&nbsp;&nbsp;
			<van-button type="default" @click="update(1)" class="submit">提交</van-button>
    </div>-->
  </div>
</template>

<script>
// import axios from "axios";
import axios from "@/router/axios";
import E from "wangeditor";

import { getLocalStorage } from "@/utils/auth";

export default {
  name: "",
  data() {
    return {
      form: {
        title: "",
        picture: [],
        picture2: [],
        content: "",
        contacts: "",
        contactNumber: "",
        contentValidity: "",
        type: "1", //0是草稿箱，1是正式,
      },
      editor: {},
      state: 0, //0是新建，1是修改
      btnStatus:false
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.state = 1;
      this.getData();
    }

    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.onchange = (html) => {
      this.form.content = html;
    };
    this.editor.customConfig.debug = true;
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      // 'foreColor',  // 文字颜色
      // 'fontSize',  // 字号
      // 'fontName',  // 字体
      // 'italic',  // 斜体
      // 'underline',  // 下划线
      // 'strikeThrough',  // 删除线
      // 'backColor',  // 背景颜色
      // "link", // 插入链接
      // 'list',  // 列表
      "justify", // 对齐方式
      "quote", // 引用
      // "emoticon", // 表情
      "image", // 插入图片
      // 'table',  // 表格
      // "video" // 插入视频
      // 'code',  // 插入代码
      // 'undo',  // 撤销
      // 'redo'  // 重复
    ];
    //过滤粘贴过来的文本样式
    this.editor.customConfig.pasteFilterStyle = true;
    //忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = false;
    //上传图片的配置
    this.editor.customConfig.uploadFileName = "multipartFile"; //设置文件上传的参数名称
    this.editor.customConfig.uploadImgServer =
      "/organization/fileOperation/putObjectByRichText?type=1"; //设置上传文件的服务器路径
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

    // let token = getLocalStorage('userToken')
    this.editor.customConfig.uploadImgHeaders = {
      userToken: getLocalStorage("userToken"),
    };
    //自定义上传图片事件
    this.editor.customConfig.uploadImgHooks = {
      before: function (xhr, editor, files) {},
      success: function (xhr, editor, result) {
        console.log(xhr);
        console.log(editor);
        console.log(result);
        console.log("上传成功");
      },
      fail: function (xhr, editor, result) {
        console.log(xhr);
        console.log(editor);
        console.log(result);
        console.log("上传失败");
      },
      error: function (xhr, editor) {
        console.log("上传出错");
      },
      timeout: function (xhr, editor) {
        console.log("上传超时");
      },
    };

    this.editor.create();
  },
  methods: {
    getData() {
      axios({
        method: "get",
        url:
          "/organization/organizationDynamics/selectById/" +
          this.$route.query.id,
      }).then((res) => {
        let data = res.data.body;
        if (data.pictureAccessory) {
          data.picture = data.picture.toString().split(",");

          data.picture2 = [data.pictureAccessory];
          data.picture2 = data.picture2.map((v) => {
            v.url = v.internetUrl;
            return v;
          });
        } else {
          data.picture = [];
        }
        this.form = data;
        this.editor.txt.html(this.form.content);
      });
    },

    beforeRead(file) {
      this.loading = this.$loading({
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return file;
    },

    compressFile(file, callback,raito) {
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
        let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result;
        image.onload = function () {
          var width, height;
          let canvas = document.createElement("canvas"), // 新建canvas
            context = canvas.getContext("2d"),
            imageWidth = image.width / raito, //压缩后图片的大小
            imageHeight = image.height / raito,
            data = "";
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          
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
          console.log(files);
          callback(files); // 回调
        };
      };
    },

    afterRead(file) {


      var M = file.file.size / 1024 / 1024;
      if (file.file.size / 1024 / 1024 > 4) {
        // this.$toast("图片不允许超过4M")
        // this.compressFile(file.file,this.uploadFn,M/2);
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
            this.form.picture2 = [];
            this.loading.close();
          });



      }else{
        this.compressFile(file.file, this.uploadFn, 1);
        // this.uploadFn(file.file)
      }

    },

    uploadFn(file) {
      var self = this;
      let formdata = new FormData();
      formdata.append("multipartFile", file);
      axios({
        method: "post",
        url: "/organization/fileOperation/putObject?type=1",
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
        },
        data: formdata,
      }).then((res) => {
        axios({
          method: "post",
          url:
            "/organization/fileOperation/pictureCheck?id=" + res.data.body.id,
        }).then((res2) => {
           self.loading.close();
          if (res2.data.resultFlag == "error") {
            // this.$toast(res2.data.body);

            var msg = res2.data.body.split("&")[0];
            this.$toast(msg);
            
            this.form.picture = [];
            this.form.picture2 = [];
          } else {
            this.form.picture.push(res.data.body.id);
          }
        });
      });
    },

    delete1() {
      this.form.picture = [];
    },
    submit(type) {
      if (!this.form.title) {
        this.$notify({
          type: "error",
          message: "标题为必填项",
        });
        return false;
      }
      this.btnStatus=true
      var url;
      if (this.form.picture instanceof Array) {
        this.form.picture = this.form.picture.join(",");
      }
      let msg = "";
      if (type == 0) {
        this.form.type = "0";
        msg = "保存成功";
        if (this.state == 0) {
          url = "/organization/organizationDynamics/save";
        } else if (this.state == 1) {
          url = "/organization/organizationDynamics/update";
        }
      } else if (type == 1) {
        this.form.type = "1";
        msg = "提交成功";
        url = "/organization/organizationDynamics/submit";
      }
      this.form.modularType = "2";
      axios({
        method: "post",
        url: url,
        data: this.form,
      }).then((res) => {
                   this.btnStatus=false
        if (res.data.resultFlag == "success") {

          this.$notify({
            type: "success",
            message: msg,
          });
          this.$router.push({
            path: "/publicWelfareManagement",
          });
        } else {
          this.$notify({
            type: "error",
            message: res.data.body,
          });
        }
      });
    },
    update(type) {
      if (!this.form.title) {
        this.$notify({
          type: "error",
          message: "标题为必填项",
        });
        return false;
      }
      this.btnStatus=true
      var url;
      if (this.form.picture instanceof Array) {
        this.form.picture = this.form.picture.join(",");
      }
      let msg = "";
      if (type == 0) {
        this.form.type = "0";
        msg = "保存成功";
        if (this.state == 0) {
          url = "/organization/organizationDynamics/save";
        } else if (this.state == 1) {
          url = "/organization/organizationDynamics/update";
        }
      } else if (type == 1) {
        this.form.type = "1";
        msg = "提交成功";
        url = "/organization/organizationDynamics/submit";
      }
      this.form.modularType = "2";

      axios({
        method: "post",
        url: url,
        data: this.form,
      }).then((res) => {
                   this.btnStatus=false
        if (res.data.resultFlag == "success") {

          this.$notify({
            type: "success",
            message: msg,
          });
          this.$router.push({
            path: "/publicWelfareManagement",
          });
        } else {
          this.$notify({
            type: "error",
            message: res.data.body,
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.publicWelfareManagementAdd .van-field__error-message {
  text-align: right;
}
.publicWelfareManagementAdd .panel__bottom {
  margin: 16px;
  display: flex;
  justify-content: space-between;
}
.publicWelfareManagementAdd div * {
  -webkit-user-select: text;
  outline: none;
}
.publicWelfareManagementAdd div {
  -webkit-user-select: text;
  outline: none;
}
</style>
