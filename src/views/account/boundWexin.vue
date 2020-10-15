<template>
  <div>
    <div style="text-align:center;margin-top:40px">
      扫码二维码绑定微信
      <div>
        <img :src="src" id="img" style="width:300px; margin-top:15px;" />
      </div>
    </div>
    <!-- <div id="qrcode" style="width:100px; height:100px; margin-top:15px;"></div> -->
  </div>
</template>

<script>
import axios from "@/router/axios";
let Base64 = require("js-base64").Base64;
// get32RanNum

import { get32RanNum } from "../../utils/util";
export default {
  name: "iswenxin",
  data() {
    return {
      APPid: "", //微信api 后端提供
      redirectUrl: "", //重定向路由 后端提供
      src: "",
      ticket: "",
      timer: "",
    };
  },
  created() {},
  mounted() {
    this.ticketQrcode();

    // console.log(this.$route.query.type);

    if (this.$route.query.type == "update") {
      // var type = "update";

      this.timer = setInterval(() => {
        axios({
          method: "get",
          url: "/organization/weiXin/checkResult",
        }).then((res) => {
          if (res.data.code == "1") {
            this.$dialog
              .alert({
                message: res.data.msg,
              })
              .then(() => {
                this.$router.push("/home");
              });
          } else if (res.data.code == "0") {

            this.$dialog
              .alert({
                message: res.data.msg,
              })
              .then(() => {
                window.location.reload()
              });

          } else if (res.data.code == "-1") {
          }
        });
      }, 1500);
    } else {
      // var type = "bind";


      // this.timer = setInterval(() => {
      //   axios({
      //     method: "get",
      //     url: "/user/user/checkSubscribe",
      //   }).then((res) => {
      //     if (res.data.body == false) {
      //     } else {
      //       var data = {
      //         value: "1",
      //         expirse: new Date().getTime() + 24 * 60 * 60 * 1000,
      //       };
      //       localStorage.setItem("bindStatus", JSON.stringify(data));

      //       this.$router.push("/home");
      //       window.clearInterval(this.timer);
      //     }
      //   });
      // }, 1500);

      this.timer = setInterval(() => {
        axios({
          method: "get",
          url: "/organization/weiXin/checkResult",
        }).then((res) => {
          if (res.data.code == "1") {
            
            
            // this.$dialog
            //   .alert({
            //     message: res.data.msg,
            //   })
            //   .then(() => {
            //     this.$router.push("/home");
            //   });

            var data = {
              value: "1",
              expirse: new Date().getTime() + 24 * 60 * 60 * 1000,
            };
            localStorage.setItem("bindStatus", JSON.stringify(data));

            this.$router.push("/home");
            window.clearInterval(this.timer);

          } else if (res.data.code == "0") {

            this.$dialog
              .alert({
                message: res.data.msg,
              })
              .then(() => {
                window.location.reload()
              });
              


          } else if (res.data.code == "-1") {
          }
        });
      }, 1500);



    }
  },
  methods: {
    ticketQrcode() {
      var url = "/organization/weiXin/getQrcode";
      axios({
        method: "get",
        url: url,
        responseType: "blob",
      }).then((res) => {
        var blob = new Blob([res.data], { type: "image/jpg" });

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
          document.getElementById("img").src = reader.result;
        };
      });
    },
    // ticketQrcode() {
    //   var appId = "wx12d7d947653749a9";
    //   var appsecret = "f6c7489ef8a4db503fc7bf0c76ae46d6";
    //   //access_token

    //   // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    //   // var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+appsecret;
    //   // axios({
    //   //   method: "post",
    //   //   url: url,
    //   // }).then((res) => {

    //   // });

    //           // this.src=res.data
    //   var access_token =
    //     "35_Zj4XqUsBZA4RVbeyOAW7I2L2Qjq7vmGO8-B8Ff_n_jp7w0x4ItTOFUoqgQtbxIL6CiT1uYDRKPXvyt68tDVbtypYcsT8SvwBLdb44yBo1ZnTf20YUdlYt2OSk6JbJy_chvgF-dqY5vvTwbYYCUXhAHAUMP";

    //   var url =
    //     "/cgi-bin/qrcode/create?access_token=" +
    //     access_token;
    //   axios({
    //     method: "post",
    //     url: url,
    //     data:{
    //       action_name:"QR_STR_SCENE",
    //       scene_id:1,
    //       scene_str:2,
    //       action_info:"详细信息"
    //     }
    //   }).then((res) => {
    //     console.log(res)
    //     this.ticket = res.data.ticket
    //     this.src = res.data.url

    //   //https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET
    //   var url =
    //     "/cgi-bin/showqrcode?ticket="+encodeURI(this.ticket)
    //   axios({
    //     method: "get",
    //     url: url,
    //   }).then((res) => {
    //     console.log(res)
    //     // this.ticket = res.data.ticket
    //     // this.src = res.data.url
    //   });
    //   });
    // },
    createdRandow() {
      return get32RanNum();
    },
    LodingType() {
      if (this.isWeiXin()) {
        //获取微信code
        var url = window.location.search;
        var Request = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1); //去掉?号
          let strs;
          strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
          }
        }
        let code = Request["code"];
        let state = Request["state"];

        if (code != "" && code != undefined && code != null) {
          state = Base64.decode(state);
          this.redirectUrl = state;
          // this.$http
          //   .get(
          //     "/api/usermc/loginOrReg/wxLogin?code=" +
          //       code +
          //       "&officialAccountType=" +
          //       config.identity
          //   )
          //   .then((res) => {
          //     console.log(res);
          //   });
        } else {
          this.getWx_auth_info();
        }
      } else {
        //非微信，调到其他页面
        alert("不是微信");
        // this.$router.push({ name: "myLogin" });
      }
    },
    //检测是否为微信登陆
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },

    //获取APPid和  redirect-url
    getWx_auth_info() {
      var initRedirectUrl;

      initRedirectUrl = Base64.encodeURI(this.$route.query.redirect || "/home");
      console.log(Base64.encodeURI("/home"));
      // wx12d7d947653749a9

      let APPId = "wx12d7d947653749a9";
      // let APPId = "wx0e479ab6b69ae3ad";
      let RedirectUrl = "http://test1.carechina.cc" + "/boundWexin";
      // let RedirectUrl = "http://htwvjq.natappfree.cc" + "/boundWexin";
      RedirectUrl = Base64.encodeURI(RedirectUrl);
      this.getWx_auth_url(APPId, RedirectUrl, initRedirectUrl);
      //跳到指定路由下
      //   this.$http
      //     .post(
      //       "/api/usermc/loginOrReg/getWXConfigTest?officialAccountType=" +
      //         config.identity
      //     )
      //     .then((res) => {
      //       let APPId = res.data.data.appId;
      //       // let APPId = "wxbc41ba35fd7ce158";
      //       let folerBaseUrl = window.location.origin;
      //       let RedirectUrl = folerBaseUrl + "/iswenxin";
      //       // let RedirectUrl = "http://b2y1841010.iask.in" + "/iswenxin";
      //       RedirectUrl = encodeURI(RedirectUrl);
      //       this.getWx_auth_url(APPId, RedirectUrl, initRedirectUrl);
      //     });
    },

    //访问微信接口
    getWx_auth_url(APPId, RedirectUrl, state) {
      //`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATUS#wechat_redirect`

      var wx_auth_url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
      // var wx_auth_url =
      // "https://open.weixin.qq.com/connect/qrconnect?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
      wx_auth_url = wx_auth_url.replace(/APPID/, APPId);
      wx_auth_url = wx_auth_url.replace(/REDIRECT_URI/, RedirectUrl);
      wx_auth_url = wx_auth_url.replace(/STATE/, state);
      // console.log(wx_auth_url);
      window.location.href = wx_auth_url;
    },
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
};
</script>

<style scoped>
</style>